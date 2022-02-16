#  TO BE DONE ....

# Get current directory
# Absolute path to this script
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in
SCRIPTPATH=$(dirname "$SCRIPT")
echo 'Absolute path this script is in' $SCRIPTPATH

LOCAL_PACKAGE=$SCRIPTPATH"/package.json"

P="package.json"


# Read File
# cat $SCRIPTPATH"/package.json"
PACKAGE=$(jq . package.json)
DEPENDENCIES=$(jq .dependencies package.json)


DEPENDENCIES_ARRAY=$(jq .dependencies $P | jq -r 'to_entries[] | [.key, .value]')
DEV_DEPENDENCIES_ARRAY=$(jq .devDependencies $P | jq -r 'to_entries[] | [.key, .value]')


echo "************ DEPENDENCIES_ARRAY ***********"
echo $DEPENDENCIES_ARRAY
echo "************ DEV_DEPENDENCIES_ARRAY ***********"
echo $DEV_DEPENDENCIES_ARRAY


echo "************  TEST ***********"


ESLINT=$(jq .devDependencies $P |jq -r  'to_entries | map(select(.key | match("eslint";"i"))) | map(.key, .value)')

echo $ESLINT
# Access variable of json file  (package json) - File type transform

# Write result to local json file