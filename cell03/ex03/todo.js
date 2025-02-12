document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todoList"); // ดึง element ที่ใช้แสดงรายการ To-Do
    const addTodoButton = document.getElementById("addTodo"); // ดึงปุ่มสำหรับเพิ่ม To-Do

    // ✅ โหลด To-Do จาก Cookies เมื่อเปิดหน้าเว็บ
    function loadTodos() {
        let todos = getCookies("todos"); // ดึงค่า To-Do ที่บันทึกไว้ใน Cookies
        if (todos) {
            todos = JSON.parse(todos); // แปลง JSON string กลับมาเป็น array
            todos.forEach(todo => addTodoToDOM(todo.text, todo.id)); // วนลูปเพื่อแสดงแต่ละ To-Do
        }
    }

    // ✅ ฟังก์ชันเพิ่ม To-Do ลงใน DOM
    function addTodoToDOM(todoText, id) {
        let todoItem = document.createElement("div"); // สร้าง div ใหม่สำหรับ To-Do
        todoItem.textContent = todoText; // ใส่ข้อความที่ผู้ใช้พิมพ์
        todoItem.classList.add("todo-item"); // เพิ่ม class เพื่อใช้ตกแต่ง CSS
        todoItem.dataset.id = id; // กำหนดค่า id ให้กับ To-Do แต่ละรายการ (ใช้ dataset)

        // ✅ เพิ่ม event ให้ To-Do สามารถลบได้เมื่อคลิก
        todoItem.addEventListener("click", () => {
            let confirmDelete = confirm("Do you really want to delete this?"); // ถามก่อนลบ
            if (confirmDelete) {
                deleteTodo(id); // ลบจาก Cookies
                todoItem.remove(); // ลบออกจาก DOM
            }
        });

        todoList.prepend(todoItem); // เพิ่ม To-Do ไปที่ด้านบนสุดของรายการ
    }

    // ✅ ฟังก์ชันดึงค่าจาก Cookies ตามชื่อที่กำหนด
    function getCookies(name) {
        let cookies = document.cookie.split("; "); // แยก Cookies ออกเป็นแต่ละค่า
        for (let cookie of cookies) {
            let [key, value] = cookie.split("="); // แยก key กับ value
            if (key === name) return decodeURIComponent(value); // ถ้าพบ key ที่ต้องการ คืนค่า value ออกไป
        }
        return null; // ถ้าไม่มี Cookies ที่ต้องการให้คืนค่า null
    }

    // ✅ ฟังก์ชันบันทึก To-Do ลงใน Cookies
    function setCookies(name, value, days) {
        let expires = new Date(); // สร้าง object วันที่
        expires.setDate(expires.getDate() + days); // กำหนดวันหมดอายุของ Cookies
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        // `path=/` ใช้เพื่อให้ Cookies ใช้ได้กับทุกหน้าของเว็บ และ `SameSite=Lax` ป้องกันบล็อก
    }

    // ✅ ฟังก์ชันลบ To-Do ออกจาก Cookies
    function deleteTodo(id) {
        let todos = getCookies("todos"); // ดึงค่าปัจจุบันของ To-Do
        if (todos) {
            todos = JSON.parse(todos); // แปลง JSON string เป็น array
            todos = todos.filter(todo => todo.id !== id); // คัดกรองออกเฉพาะ To-Do ที่ไม่ได้ลบ
            setCookies("todos", JSON.stringify(todos), 7); // อัปเดต Cookies ใหม่
        }
    }

    // ✅ เมื่อกดปุ่ม "New" ให้เพิ่ม To-Do ใหม่
    addTodoButton.addEventListener("click", () => {
        let todoText = prompt("Enter your new task:"); // แสดงกล่อง prompt ให้ผู้ใช้พิมพ์
        if (todoText) {
            let id = new Date().getTime(); // สร้าง id ไม่ซ้ำ (ใช้ timestamp)
            let newTodo = { id, text: todoText }; // เก็บ To-Do ในรูปแบบ object

            let todos = getCookies("todos"); // ดึงค่า To-Do เดิมจาก Cookies
            todos = todos ? JSON.parse(todos) : []; // ถ้าไม่มีให้ใช้ array ว่าง
            todos.unshift(newTodo); // เพิ่ม To-Do ใหม่ไว้ด้านบนสุดของ array
            setCookies("todos", JSON.stringify(todos), 7); // บันทึก To-Do ลงใน Cookies (มีอายุ 7 วัน)

            addTodoToDOM(todoText, id); // แสดง To-Do ใหม่บนหน้าเว็บ
        }
    });

    loadTodos(); // ✅ โหลด To-Do ตอนเปิดหน้าเว็บ
});
