export const APP_ROUTES = {
  HISTOGRAM: 'histogram',
  MAZE: 'maze',
};

export const SORTING_ALGORITHMS = {
  BUBBLE_SORT: 'Bubble Sort',
  MERGE_SORT: 'Merge Sort',
  INSERTION_SORT: 'Insertion Sort',
  SELECTION_SORT: 'Selection Sort',
  QUICK_SORT: 'Quick Sort',
  HEAP_SORT: 'Heap Sort',
  BUCKET_SORT: 'Bucket Sort',
  RADIX_SORT: 'Radix Sort',
  COUNTING_SORT: 'Counting Sort',
  SHELL_SORT: 'Shell Sort',
};

export const FINDING_ALGORITHMS = {
  BREADTH_FIRST_SEARCH: 'Breadth First Search',
  DEPTH_FIRST_SEARCH: 'Depth First Search',
  DIJKSTRA: 'Dijkstra',
  A_STAR: 'A*',
  PRIM: 'Prim',
  KRUSKAL: 'Kruskal',
};

export const SORTING_ALGORITHM_DETAILS: { [key: string]: string } = {
  [SORTING_ALGORITHMS.BUBBLE_SORT]: `
Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. The largest elements "bubble up" to the end of the list with each pass.

📌 Example:
Input: [5, 2, 9, 1]
Step 1: [2, 5, 1, 9]
Step 2: [2, 1, 5, 9]
Step 3: [1, 2, 5, 9]

✅ Best Case: O(n) (when already sorted)
❌ Worst Case: O(n²)
🧠 Space: O(1) – in-place
  `,

  [SORTING_ALGORITHMS.SELECTION_SORT]: `
Selection Sort finds the smallest (or largest) element and swaps it with the first unsorted position. It does this repeatedly.

📌 Example:
Input: [4, 2, 7, 1]
Step 1: [1, 2, 7, 4]
Step 2: [1, 2, 7, 4]
Step 3: [1, 2, 4, 7]

❌ Always: O(n²)
🧠 Space: O(1) – in-place
  `,

  [SORTING_ALGORITHMS.INSERTION_SORT]: `
Insertion Sort builds the sorted array one item at a time by comparing each element with the ones before it and inserting it into its correct position.

📌 Example:
Input: [3, 1, 4, 2]
Step 1: [1, 3, 4, 2]
Step 2: [1, 3, 4, 2]
Step 3: [1, 2, 3, 4]

✅ Best Case: O(n) (nearly sorted)
❌ Worst: O(n²)
🧠 Space: O(1)
  `,

  [SORTING_ALGORITHMS.MERGE_SORT]: `
Merge Sort is a divide-and-conquer algorithm that splits the array, sorts the halves, and merges them.

📌 Example:
Input: [4, 2, 5, 1]
Split: [4,2] and [5,1]
Sorted Halves: [2,4] and [1,5]
Merge: [1,2,4,5]

✅ Always: O(n log n)
🧠 Space: O(n) – uses extra space for merging
  `,

  [SORTING_ALGORITHMS.QUICK_SORT]: `
Quick Sort chooses a pivot, partitions the array into less and greater elements, and recursively sorts them.

📌 Example:
Input: [5, 3, 7, 2]
Pivot = 5 → Left: [3, 2], Right: [7]
Recursive Sort → [2, 3, 5, 7]

✅ Avg: O(n log n)
❌ Worst: O(n²) (bad pivot choice)
🧠 Space: O(log n) – due to recursion
  `,

  [SORTING_ALGORITHMS.COUNTING_SORT]: `
Counting Sort counts the frequency of elements and places them in sorted order. Best for integers in a known range.

📌 Example:
Input: [4, 2, 2, 8, 3]
Count: [0, 0, 2, 1, 1, 0, 0, 0, 1]
Sorted Output: [2, 2, 3, 4, 8]

✅ Time: O(n + k)
🧠 Space: O(k) – extra space for counts
⚠️ Works only for integers
  `,

  [SORTING_ALGORITHMS.RADIX_SORT]: `
Radix Sort sorts numbers digit by digit starting from the least significant digit using a stable sort like Counting Sort.

📌 Example:
Input: [170, 45, 75, 90]
Sort by units → [170, 90, 45, 75]
Then tens → [170, 45, 75, 90]
Then hundreds → [45, 75, 90, 170]

✅ Time: O(nk)
🧠 Space: O(n + k)
⚠️ Works for integers or fixed-length strings
  `,

  [SORTING_ALGORITHMS.BUCKET_SORT]: `
Bucket Sort distributes elements into buckets, sorts each bucket individually, and then concatenates them.

📌 Example:
Input: [0.78, 0.17, 0.39, 0.26]
Buckets:
  [0.17], [0.26], [0.39], [0.78]
Sorted: [0.17, 0.26, 0.39, 0.78]

✅ Best: O(n + k)
❌ Worst: O(n²)
🧠 Space: O(n + k)
⚠️ Works well for uniformly distributed data
  `,

  [SORTING_ALGORITHMS.SHELL_SORT]: `
Shell Sort is a generalized version of Insertion Sort. It starts by comparing elements far apart, then gradually reduces the gap.

📌 Example:
Input: [8, 5, 3, 7, 6]
Gap = 2: compare 8↔3, 5↔7, 3↔6
Gap = 1: perform Insertion Sort

✅ Avg: ~O(n log n)
❌ Depends on gap sequence
🧠 Space: O(1)
  `,

  [SORTING_ALGORITHMS.HEAP_SORT]: `
  Heap Sort uses a binary heap (typically a max-heap) to repeatedly extract the maximum element and place it at the end of the array.
  - Step 1: Build a max heap from the input data.
  - Step 2: Swap the root (largest) element with the last item and reduce the heap size.
  - Step 3: Heapify the root again and repeat until the heap size is 1.

  Example:
  Input: [4, 10, 3, 5, 1]
  Step 1 (Build Max Heap): [10, 5, 3, 4, 1]
  Step 2 (Sort):
    → Swap 10 and 1: [1, 5, 3, 4, 10], heapify → [5, 4, 3, 1, 10]
    → Swap 5 and 1: [1, 4, 3, 5, 10], heapify → [4, 1, 3, 5, 10]
    → ...continue until sorted.
  Output: [1, 3, 4, 5, 10]

  - Time Complexity: O(n log n) for all cases
  - Space Complexity: O(1)
  - Not a stable sort
`,
};

export const FINDING_ALGORITHM_DETAILS: { [key: string]: string } = {
  [FINDING_ALGORITHMS.BREADTH_FIRST_SEARCH]: `

BFS explores nodes level by level, visiting all neighbors before moving deeper. It uses a queue to manage nodes.

🔹 Steps:  
1. Start at the root node and enqueue it.  
2. Dequeue a node, visit it, enqueue its unvisited neighbors.  
3. Repeat until the queue is empty or the target is found.

🔹 Complexity:  
- Time: O(V + E)  
- Space: O(V)  
🔸 Works best on unweighted graphs.
  `,

  [FINDING_ALGORITHMS.DEPTH_FIRST_SEARCH]: `
 
DFS explores as far as possible along each path before backtracking. It can be implemented with recursion or a stack.

🔹 Steps:  
1. Start from the root node and push it onto the stack.  
2. Pop a node, visit it, and push its unvisited neighbors.  
3. Repeat until the stack is empty or the target is found.

🔹 Complexity:  
- Time: O(V + E)  
- Space: O(V)  
🔸 Useful for cycle detection, topological sort, and pathfinding.
  `,

  [FINDING_ALGORITHMS.DIJKSTRA]: `
 
Finds the shortest path from a source node to all others in a graph with non-negative weights, using a priority queue.

🔹 Steps:  
1. Set distances to infinity, except source (0).  
2. Add source to the priority queue.  
3. Extract the node with the smallest distance.  
4. Update distances for its neighbors if a shorter path is found.  
5. Repeat until all nodes are visited.

🔹 Complexity:  
- Time: O((V + E) log V)  
- Space: O(V)  
🔸 Optimal for graphs with non-negative edge weights.
  `,

  [FINDING_ALGORITHMS.A_STAR]: `

An informed search algorithm combining Dijkstra’s cost with a heuristic estimate to the goal.

🔹 Steps:  
1. Add the start node to the open list.  
2. While the list is not empty:  
   - Pick the node with the lowest f(n) = g(n) + h(n).  
   - If it’s the goal, return the path.  
   - Otherwise, evaluate neighbors and update their costs.  
3. Move visited nodes to the closed list.

🔹 Complexity:  
- Time: O(E) (depends on heuristic accuracy)  
- Space: O(V)  
🔸 Efficient when a good heuristic is available.
  `,

  [FINDING_ALGORITHMS.PRIM]: `

Builds a Minimum Spanning Tree (MST) by expanding from a starting node using the smallest connecting edge.

🔹 Steps:  
1. Start from any node and add it to the MST.  
2. At each step, pick the smallest edge that connects MST to a new vertex.  
3. Repeat until all vertices are included.

🔹 Complexity:  
- Time: O(E log V)  
- Space: O(V)  
🔸 Ideal for dense, connected graphs.
  `,

  [FINDING_ALGORITHMS.KRUSKAL]: `
 
Finds the MST by adding edges in increasing order of weight without forming cycles.

🔹 Steps:  
1. Sort all edges by weight.  
2. Initialize each vertex in its own set (disjoint set).  
3. Add edges one by one, skipping any that would form a cycle.  
4. Merge sets as edges are added.

🔹 Complexity:  
- Time: O(E log E)  
- Space: O(V)  
🔸 Suitable for sparse graphs.
  `,
};
