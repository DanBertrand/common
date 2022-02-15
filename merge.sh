#  TO BE DONE ....

# Get current directory
# Absolute path to this script
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in
SCRIPTPATH=$(dirname "$SCRIPT")
echo 'Absolute path this script is in' $SCRIPTPATH

# Read File
cat $SCRIPTPATH"/package.json"

# Access variable of json file  (package json) - File type transform

# Write result to local json file