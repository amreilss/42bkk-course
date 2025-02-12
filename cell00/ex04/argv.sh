#!/bin/bash

# ตรวจสอบจำนวนพารามิเตอร์ที่ได้รับ
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
elif [ $# -eq 1 ]; then
    echo $1
elif [ $# -eq 2 ]; then
    echo $1
    echo $2
elif [ $# -eq 3 ]; then
    echo $1
    echo $2
    echo $3
else
    # ถ้ามีพารามิเตอร์มากกว่า 3 ตัว
    echo "$1"
    echo "$2"
    echo "$3"
fi
