import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DetailsCardComponent } from '../details-card/details-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FINDING_ALGORITHM_DETAILS,
  FINDING_ALGORITHMS,
} from '../shared-constants';

@Component({
  selector: 'app-maze',
  imports: [DropdownComponent, DetailsCardComponent, CommonModule],
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.css',
})
export class MazeComponent {
  constructor(private router: Router) {}

  redirectToDashboard(): void {
    this.router.navigate(['']);
  }

  finingAlgoOptions = Object.values(FINDING_ALGORITHMS);
  selectedAlgo: string = this.finingAlgoOptions[0];
  isSorting: boolean = false;
  isMazeGenerated: boolean = false;
  rows: number = 30;
  cols: number = this.rows;
  maze: string[][] = [];
  visited: boolean[][] = [];
  animationDelay: number = 1;
  start: [number, number] | null = null;
  goal: [number, number] | null = null;
  selectionMode: 'start' | 'goal' | null = 'start'; // default: selecting start

  get selectedAlgoDetail(): string {
    return FINDING_ALGORITHM_DETAILS[this.selectedAlgo] || '';
  }

  handleSelectAlgo(option: string) {
    this.selectedAlgo = option;
  }

  handleMazeRowsCount(event: Event) {
    const target = event.target as HTMLInputElement;
    this.rows = parseInt(target.value, 10);
    this.cols = this.rows;
  }

  getAdaptiveDelay(): number {
    const totalCells = this.rows * this.cols;
    const baseTime = 100; // Target 3 seconds animation total
    const delay = baseTime / totalCells;
    return Math.max(0.1, delay); // Minimum 1ms
  }

  async generateMaze(): Promise<void> {
    this.start = null;
    this.goal = null;
    this.selectionMode = 'start';
    this.initializeMaze();
    this.animationDelay = this.getAdaptiveDelay();
    await this.carveMaze(1, 1); // Start at top-left corner
    this.isMazeGenerated = true;
  }

  initializeMaze(): void {
    this.maze = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => 'wall')
    );
    this.visited = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => false)
    );
  }

  async carveMaze(row: number, col: number): Promise<void> {
    const directions = this.shuffle([
      [0, 2],
      [0, -2],
      [2, 0],
      [-2, 0],
    ]);

    this.visited[row][col] = true;
    this.maze[row][col] = 'path';
    await this.sleep(this.animationDelay); // cell visit animation

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow > 0 &&
        newRow < this.rows - 1 &&
        newCol > 0 &&
        newCol < this.cols - 1 &&
        !this.visited[newRow][newCol]
      ) {
        this.maze[row + dr / 2][col + dc / 2] = 'path';
        await this.sleep(this.animationDelay); // wall carving animation
        await this.carveMaze(newRow, newCol);
      }
    }
  }

  shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  handleCellClick(i: number, j: number): void {
    if (this.maze[i][j] !== 'path') return; // only allow selection on paths

    if (this.selectionMode === 'start') {
      this.start = [i, j];
      this.selectionMode = 'goal'; // next click is for goal
    } else if (this.selectionMode === 'goal') {
      this.goal = [i, j];
      this.selectionMode = null; // done selecting
    }
  }
  isStart(i: number, j: number): boolean {
    return this.start?.[0] === i && this.start?.[1] === j;
  }

  isGoal(i: number, j: number): boolean {
    return this.goal?.[0] === i && this.goal?.[1] === j;
  }

  async resetSelection(): Promise<void> {
    this.start = null;
    this.goal = null;
    this.selectionMode = 'start';
    await this.generateMaze();
  }

  async startPathfinding(): Promise<void> {
    this.isSorting = true;
    switch (this.selectedAlgo) {
      case FINDING_ALGORITHMS.BREADTH_FIRST_SEARCH:
        await this.runBFS();
        break;
      case FINDING_ALGORITHMS.DEPTH_FIRST_SEARCH:
        await this.runDFS();
        break;
      case FINDING_ALGORITHMS.DIJKSTRA:
        await this.runDijkstra();
        break;
      case FINDING_ALGORITHMS.A_STAR:
        await this.runAStar();
        break;
      case FINDING_ALGORITHMS.PRIM:
        await this.runPrim();
        break;
      case FINDING_ALGORITHMS.KRUSKAL:
        await this.runKruskal();
        break;
    }
    this.isSorting = false;
  }

  //BFS
  async runBFS(): Promise<void> {
    if (!this.start || !this.goal) return;

    const [startRow, startCol] = this.start;
    const [goalRow, goalCol] = this.goal;

    const queue: [number, number][] = [[startRow, startCol]];
    const visited = new Set<string>();
    const parent: Record<string, [number, number] | null> = {};

    const key = (r: number, c: number) => `${r},${c}`;
    parent[key(startRow, startCol)] = null;

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      const k = key(r, c);

      if (visited.has(k)) continue;
      visited.add(k);

      if (this.maze[r][c] !== 'path') continue;

      if (!(this.isStart(r, c) || this.isGoal(r, c))) {
        this.maze[r][c] = 'visited';
        await this.sleep(this.animationDelay);
      }

      if (r === goalRow && c === goalCol) {
        break;
      }

      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nr < this.rows &&
          nc >= 0 &&
          nc < this.cols &&
          !visited.has(key(nr, nc)) &&
          this.maze[nr][nc] === 'path'
        ) {
          queue.push([nr, nc]);
          parent[key(nr, nc)] = [r, c];
        }
      }
    }

    // Backtrack from goal to start to draw the final path
    let current: [number, number] | null = [goalRow, goalCol];
    while (current && !this.isStart(current[0], current[1])) {
      const r: number = current[0];
      const c: number = current[1];
      if (!this.isGoal(r, c)) {
        this.maze[r][c] = 'path-to-goal';
        await this.sleep(this.animationDelay);
      }
      current = parent[key(r, c)];
    }
  }

  async runDFS(): Promise<void> {
    if (!this.start || !this.goal) return;
    const [startRow, startCol] = this.start;
    const [goalRow, goalCol] = this.goal;
    const visited: boolean[][] = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );
    const parent: Record<string, [number, number]> = {};
    const key = (r: number, c: number) => `${r},${c}`;

    const stack: [number, number][] = [[startRow, startCol]];
    visited[startRow][startCol] = true;

    while (stack.length) {
      const [r, c] = stack.pop()!;
      if (r === goalRow && c === goalCol) break;

      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < this.rows &&
          nc < this.cols &&
          this.maze[nr][nc] === 'path' &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = true;
          parent[key(nr, nc)] = [r, c];
          stack.push([nr, nc]);
          this.maze[nr][nc] = 'visited';
          await this.sleep(this.animationDelay);
        }
      }
    }

    let current: [number, number] | undefined = [goalRow, goalCol];
    while (current && !this.isStart(current[0], current[1])) {
      const r: number = current[0];
      const c: number = current[1];
      if (!this.isGoal(r, c)) {
        this.maze[r][c] = 'path-to-goal';
        await this.sleep(this.animationDelay);
      }
      current = parent[key(r, c)];
    }
  }

  async runDijkstra(): Promise<void> {
    await this.runAStar(false);
  }

  async runAStar(useHeuristic = true): Promise<void> {
    if (!this.start || !this.goal) return;
    const [startRow, startCol] = this.start;
    const [goalRow, goalCol] = this.goal;

    const dist: number[][] = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(Infinity)
    );
    const visited: boolean[][] = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );
    const parent: Record<string, [number, number]> = {};
    const key = (r: number, c: number) => `${r},${c}`;

    dist[startRow][startCol] = 0;
    const pq: [number, number, number][] = [[0, startRow, startCol]];

    while (pq.length > 0) {
      pq.sort((a, b) => a[0] - b[0]);
      const [curCost, r, c] = pq.shift()!;
      if (visited[r][c]) continue;
      visited[r][c] = true;

      if (r === goalRow && c === goalCol) break;

      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < this.rows &&
          nc < this.cols &&
          this.maze[nr][nc] === 'path'
        ) {
          const heuristic = useHeuristic
            ? Math.abs(goalRow - nr) + Math.abs(goalCol - nc)
            : 0;
          const newCost = dist[r][c] + 1;
          if (newCost < dist[nr][nc]) {
            dist[nr][nc] = newCost;
            parent[key(nr, nc)] = [r, c];
            pq.push([newCost + heuristic, nr, nc]);
            this.maze[nr][nc] = 'visited';
            await this.sleep(this.animationDelay);
          }
        }
      }
    }

    let cur: [number, number] | null = [goalRow, goalCol];
    while (cur && !this.isStart(cur[0], cur[1])) {
      const r: number = cur[0];
      const c: number = cur[1];
      this.maze[r][c] = 'path-to-goal';
      await this.sleep(this.animationDelay);
      cur = parent[key(r, c)] || null;
    }
  }

  async runPrim(): Promise<void> {
    if (!this.start || !this.goal) return;

    const [startRow, startCol] = this.start;
    const [goalRow, goalCol] = this.goal;
    const visited = new Set<string>();
    const parent: Record<string, [number, number]> = {};
    const key = (r: number, c: number) => `${r},${c}`;

    const pq: [number, number][] = [[startRow, startCol]];
    visited.add(key(startRow, startCol));

    while (pq.length > 0) {
      const [r, c] = pq.shift()!;

      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < this.rows &&
          nc < this.cols &&
          this.maze[nr][nc] === 'path' &&
          !visited.has(key(nr, nc))
        ) {
          visited.add(key(nr, nc));
          parent[key(nr, nc)] = [r, c];
          pq.push([nr, nc]);

          if (!this.isStart(nr, nc) && !this.isGoal(nr, nc)) {
            this.maze[nr][nc] = 'visited';
            await this.sleep(this.animationDelay);
          }

          if (nr === goalRow && nc === goalCol) break;
        }
      }
    }

    // Reconstruct path
    let current: [number, number] | undefined = [goalRow, goalCol];
    while (current && !this.isStart(current[0], current[1])) {
      const r: number = current[0];
      const c: number = current[1];
      if (!this.isGoal(r, c)) {
        this.maze[r][c] = 'path-to-goal';
        await this.sleep(this.animationDelay);
      }
      current = parent[key(r, c)];
    }
  }

  async runKruskal(): Promise<void> {
    if (!this.start || !this.goal) return;

    const [startRow, startCol] = this.start;
    const [goalRow, goalCol] = this.goal;
    const key = (r: number, c: number) => `${r},${c}`;

    const parent: Record<string, [number, number]> = {};

    // Initialize disjoint set for each 'path' cell
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.maze[r][c] === 'path') {
          parent[key(r, c)] = [r, c];
        }
      }
    }

    // Disjoint set find with path compression
    const find = (r: number, c: number): [number, number] => {
      const k = key(r, c);
      if (parent[k][0] !== r || parent[k][1] !== c) {
        parent[k] = find(parent[k][0], parent[k][1]);
      }
      return parent[k];
    };

    // Generate all undirected edges between adjacent 'path' cells
    const edges: [number, number, number, number][] = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.maze[r][c] !== 'path') continue;
        if (r + 1 < this.rows && this.maze[r + 1][c] === 'path')
          edges.push([r, c, r + 1, c]);
        if (c + 1 < this.cols && this.maze[r][c + 1] === 'path')
          edges.push([r, c, r, c + 1]);
      }
    }

    // Shuffle edges randomly
    edges.sort(() => Math.random() - 0.5);

    // Kruskal's algorithm: build MST
    for (const [r1, c1, r2, c2] of edges) {
      const root1 = find(r1, c1);
      const root2 = find(r2, c2);

      if (root1[0] !== root2[0] || root1[1] !== root2[1]) {
        parent[key(root2[0], root2[1])] = root1;

        // Animate the MST being built
        if (!this.isStart(r1, c1) && !this.isGoal(r1, c1)) {
          this.maze[r1][c1] = 'visited';
          await this.sleep(this.animationDelay);
        }

        if (!this.isStart(r2, c2) && !this.isGoal(r2, c2)) {
          this.maze[r2][c2] = 'visited';
          await this.sleep(this.animationDelay);
        }
      }
    }

    // Reconstruct path from start to goal using BFS on MST
    const queue: [number, number][] = [[startRow, startCol]];
    const visited = new Set<string>();
    const pathParent: Record<string, [number, number]> = {};

    visited.add(key(startRow, startCol));

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      if (r === goalRow && c === goalCol) break;

      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < this.rows &&
          nc < this.cols &&
          this.maze[nr][nc] !== 'wall' &&
          !visited.has(key(nr, nc)) &&
          JSON.stringify(find(r, c)) === JSON.stringify(find(nr, nc)) // Only move within same tree
        ) {
          visited.add(key(nr, nc));
          pathParent[key(nr, nc)] = [r, c];
          queue.push([nr, nc]);
        }
      }
    }

    // Animate the shortest path from goal to start
    let current: [number, number] | undefined = [goalRow, goalCol];
    while (current && !this.isStart(current[0], current[1])) {
      const r: number = current[0];
      const c: number = current[1];
      if (!this.isGoal(r, c)) {
        this.maze[r][c] = 'path-to-goal';
        await this.sleep(this.animationDelay);
      }
      current = pathParent[key(r, c)];
    }
  }
}
