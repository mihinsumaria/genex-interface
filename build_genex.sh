ROOT=$(pwd)

set -e

echo "=============== Build GENEX ==============="
cd genex
mkdir -p build && cd build
cmake ..
make -j

mkdir -p $ROOT/webapp
cp -v pygenex.so $ROOT/genex-interface/pygenex.so

echo "=============== DONE ==============="
