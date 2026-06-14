#include <emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE
int getVertexCount() {
    return 6 * 400; // small world for testing
}

EMSCRIPTEN_KEEPALIVE
void generateWorld(float* buffer) {
    int index = 0;
    for (int x = -20; x < 20; x++) {
        for (int z = -20; z < 20; z++) {
            float h = 0.0f;
            // Triangle 1
            buffer[index++] = x;    buffer[index++] = h; buffer[index++] = z;
            buffer[index++] = x+1;  buffer[index++] = h; buffer[index++] = z;
            buffer[index++] = x;    buffer[index++] = h; buffer[index++] = z+1;
            // Triangle 2
            buffer[index++] = x+1;  buffer[index++] = h; buffer[index++] = z;
            buffer[index++] = x+1;  buffer[index++] = h; buffer[index++] = z+1;
            buffer[index++] = x;    buffer[index++] = h; buffer[index++] = z+1;
        }
    }
}

}
