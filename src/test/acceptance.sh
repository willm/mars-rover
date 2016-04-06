#!/bin/sh

cat src/test/input.txt | node build/mars-rover > /tmp/output
diff src/test/expected-output.txt /tmp/output
status=$?
if [ $status -ne 0 ]
then
    echo "test outputs did not match, failed"
    exit 1
else
    echo "PASSED!"
    exit 0
fi
