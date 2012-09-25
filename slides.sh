#!/bin/bash
id=$(node -e 'console.log(Math.random().toString(16).slice(2))')
dir="/tmp/slides/$id"
mkdir -p $dir

slides=$(grep '^!' slides.markdown | sed 's/.*(//; s/)$//')
i=0
echo $dir
for slide in $slides; do 
    echo $slide
    ln -s $PWD/$slide $dir/$(printf "%04d" $i)_$(basename "$slide")
    i=$((i+1))
done

eog $dir/*
