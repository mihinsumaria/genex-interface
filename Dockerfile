FROM rikorose/gcc-cmake:gcc-7

COPY . /app

WORKDIR /app

RUN echo `uname -a`
RUN apt-get update \ 
&& apt-get -y  install libreadline6-dev python-dev zlibc zlib1g zlib1g-dev

RUN curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py" && \
python get-pip.py

RUN wget https://dl.bintray.com/boostorg/release/1.66.0/source/boost_1_66_0.tar.gz \
&& tar xzf boost_1_66_0.tar.gz \
&& cd boost_1_66_0 \
&& ./bootstrap.sh --with-libraries=serialization,iostreams,python,test \
&& ./b2 install

 WORKDIR /app/genex

ENV LD_LIBRARY_PATH=/usr/local/lib
RUN mkdir build && \
cd build && cmake .. && \
make -j 2 && \
cd .. && python setup.py install

WORKDIR /app

RUN pip install -r requirements.txt 

WORKDIR /app/genex-interface

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
apt-get install -y nodejs && \
npm install && npm run build


CMD ["/bin/bash"]