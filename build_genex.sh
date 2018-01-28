ROOT=$(pwd)

set -e

echo "=============== Build GENEX ==============="
cd genex
mkdir -p build && cd build
cmake ..
make

mkdir -p $ROOT/webapp
cp -v pygenex.so $ROOT/webapp/pygenex.so

echo "=============== DONE ==============="
