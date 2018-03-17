ROOT=$(pwd)

set -e

echo "=============== Build GENEX ==============="
cd genex
./build.sh --cmake "-DBUILD_PYGENEX=ON -DBUILD_CLI=OFF -DBUILD_TESTS=OFF"

cd $ROOT
mkdir -p $ROOT/webapp
cp -v $ROOT/genex/build/pygenex.so $ROOT/genex-interface/pygenex.so

echo "=============== DONE ==============="
