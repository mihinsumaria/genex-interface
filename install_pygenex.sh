ROOT=$(pwd)

set -e

echo "=============== Install PYGENEX ==============="
cd genex
python setup.py install
echo "=============== DONE ==============="
