cmake_minimum_required(VERSION 3.10)
project(voxel_engine)

set(CMAKE_CXX_STANDARD 17)

add_executable(voxel_engine src/voxel.cpp)

set_target_properties(voxel_engine PROPERTIES
    LINK_FLAGS "-s WASM=1 -s EXPORTED_FUNCTIONS='[\"_getVertexCount\",\"_generateWorld\"]' -s EXPORTED_RUNTIME_METHODS='[\"ccall\",\"cwrap\"]' -s ALLOW_MEMORY_GROWTH=1 -s NO_EXIT_RUNTIME=1"
)
