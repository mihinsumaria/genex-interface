if [ $# -gt 0 ]; then
    PATTERN="-p $1"
fi

python -m unittest discover -s app.test $PATTERN