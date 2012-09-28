# harnessing streams

![harnessing streams](images/harnessing_streams.png)

# the way of IO

"We should have some ways of connecting programs like garden hose--screw in
another segment when it becomes when it becomes necessary to massage data in
another way. This is the way of IO also."

Doug McIlroy. October 11, 1964
http://cm.bell-labs.com/who/dmr/mdmpipe.html

![garden hose](images/garden_hose.png)

# readable

* fs.createReadStream()

![readable](images/readable.png)

`example/readable`

# writable

* fs.createWriteStream()
* concat-stream
* delta-stream

![writable](images/writable.png)

`example/writable`

# through streams

input to output

filters, buffering

* zlib.createGzip()
* through

![through](images/through.png)

`example/through`

## buffering

* pause-stream

![pause-stream](images/pause_stream.png)

`example/buffering`

## throttling

* (throttling lib)

## parser/serialization streams

* JSONStream
* stream-serializer
* trumpet
* tap

`example/JSONStream`

# duplex streams

Back and forth, like a telephone.

![duplex streams](images/duplex_streams.png)

When you see `a.pipe(b).pipe(a)` you've probably got a duplex stream.

![a.pipe(b).pipe(a)](images/a_pipe_b_pipe_a.png)

* duplexer

`example/duplexer`

![duplexer](images/duplexer.png)

* http-duplexer

## rpc

* dnode

![dnode](images/dnode.png)

`example/dnode`

## state synchronization

* scuttlebutt

![scuttlebutt](images/scuttlebutt.png)

![gossip protocol](images/gossip_protocol.png)

(use case: web server peering)

`example/scuttlebutt`

# event streams

* emit-stream

![emit-stream](images/emit_stream.gif)

`example/emit-stream`

# streams inside streams

* mux-demux

![mux-demux](images/mux-demux.png)

`example/mux-demux`

# streams in the browser

* browserify
* shoe
* domnode
* sorta
* graph-stream

![shoe](images/shoe.png)

`example/shoe`

# freestyle stream livecoding demo

let's build a streaming webapp that:
* synchronizes state across all users
* listens on a server-side event emitter
* has an rpc control interface
* all as streams over mux-demux
* in node and the browser
* across multiple servers

![eof](images/freestyle.png)

`example/freestyle`

1. npm install all the things

2. write the code

3. the third step is you're done

![eof](images/process_exit.png)
