# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
echo "Absolute path to this script" $SCRIPTPATH
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo "Absolute path this script is in" $SCRIPTPATH

node merge.js $SCRIPTPATH