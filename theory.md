### Brief History
The Floyd–Warshall algorithm is an example of dynamic programming and was published in its currently recognized form by Robert Floyd in 1962.

### Description
The Floyd–Warshall algorithm is an algorithm for finding the shortest paths in a weighted graph with positive or negative edge weights. A single execution of the algorithm will find the lengths of the shortest paths between all pairs of vertices.

Through the distance table, it is possible to find the shortest path between any two vertices.

The algorithm doesn't work with negative cycles.

### Working
The algorithm works by using a distance table to store the shortest distance between any two vertices. The distance table is initialized with the weights of the edges between the vertices. The algorithm then iterates through the vertices, updating the distance table with the shortest distance between any two vertices. The distance table is updated by comparing the distance between two vertices with the distance between the two vertices with an intermediate vertex.

The algorithm is implemented in the following way:

    for k from 1 to n:
        for i from 1 to n:
            for j from 1 to n:
                if d[i][j] > d[i][k] + d[k][j]:
                    d[i][j] = d[i][k] + d[k][j]

Here k is the intermediate vertex, i is the starting vertex and j is the ending vertex.

For every intermediate vertex, the algorithm iterates through every pair of vertices, updating the distance table with the shortest distance between any two vertices.

### Complexity
The complexity of the algorithm is O(n^3).

The best, worst and average case complexity is O(n^3).