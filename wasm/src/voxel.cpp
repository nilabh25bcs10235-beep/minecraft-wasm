#include <emscripten.h>
#include <vector>
#include <unordered_map>

struct Vertex {
    float x, y, z;
};

// Simple greedy meshing for flat surfaces (Stage 2)
extern "C" {

EMSCRIPTEN_KEEPALIVE
int getVertexCount() {
    return 6 * 800; // Increased for better world
}

EMSCRIPTEN_KEEPALIVE
void generateWorld(float* buffer) {
    int index = 0;
    for (int x = -30; x < 30; x++) {
        for (int z = -30; z < 30; z++) {
            float height = 0.0f + (sin(x * 0.2f) + cos(z * 0.2f)) * 1.5f;

            // Greedy quad for ground
            buffer[index++] = x;     buffer[index++] = height; buffer[index++] = z;
            buffer[index++] = x+1;   buffer[index++] = height; buffer[index++] = z;
            buffer[index++] = x;     buffer[index++] = height; buffer[index++] = z+1;

            buffer[index++] = x+1;   buffer[index++] = height; buffer[index++] = z;
            buffer[index++] = x+1;   buffer[index++] = height; buffer[index++] = z+1;
            buffer[index++] = x;     buffer[index++] = height; buffer[index++] = z+1;
        }
    }
}

}
