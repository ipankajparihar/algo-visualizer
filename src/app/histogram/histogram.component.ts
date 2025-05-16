import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DetailsCardComponent } from '../details-card/details-card.component';
import { CommonModule, NgIf } from '@angular/common';
import {
  SORTING_ALGORITHMS,
  SORTING_ALGORITHM_DETAILS,
} from '../shared-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-histogram',
  imports: [DropdownComponent, DetailsCardComponent, CommonModule],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.css',
})
export class HistogramComponent {
  constructor(private router: Router) {}

  redirectToDashboard(): void {
    this.router.navigate(['']);
  }
  sortingOptions = Object.values(SORTING_ALGORITHMS);
  selectedAlgo: string = this.sortingOptions[0];
  executionSpeed: number = 100;

  histogramData: number[] = [];
  maxHistogramValue = 100;
  defaultHistogramBar = 20;
  currentIndex: number | null = -1;
  compareIndex: number | null = -1;
  isSorting: boolean = false;
  isHistogramGenerated: boolean = false;

  get selectedAlgoDetail(): string {
    return SORTING_ALGORITHM_DETAILS[this.selectedAlgo] || '';
  }

  generateRandomHistogram() {
    this.histogramData = [];
    this.currentIndex = -1;
    this.compareIndex = -1;
    for (let i = 0; i < this.defaultHistogramBar; i++) {
      this.histogramData.push(Math.random() * this.maxHistogramValue);
    }
    this.isHistogramGenerated = true;
  }

  handleHistogramBarsCount(event: Event) {
    const inputValue = event.target as HTMLInputElement;
    this.defaultHistogramBar = Number(inputValue.value);
    this.generateRandomHistogram();
  }

  handleExecutionSpeed(event: Event) {
    const inputValue = event.target as HTMLInputElement;
    this.executionSpeed = 10000 / Number(inputValue.value);
  }

  handleSelectAlgo(option: string) {
    this.selectedAlgo = option;
  }

  handleResetIndex() {
    this.currentIndex = -1;
    this.compareIndex = -1;
  }

  //handle sort
  async handleSort(): Promise<void> {
    this.isSorting = true;
    switch (this.selectedAlgo) {
      case SORTING_ALGORITHMS.BUBBLE_SORT:
        await this.bubbleSort();
        break;
      case SORTING_ALGORITHMS.INSERTION_SORT:
        await this.insertionSort();
        break;
      case SORTING_ALGORITHMS.SELECTION_SORT:
        await this.selectionSort();
        break;
      case SORTING_ALGORITHMS.MERGE_SORT:
        await this.mergeSort();
        break;
      case SORTING_ALGORITHMS.QUICK_SORT:
        await this.quickSort();
        break;
      case SORTING_ALGORITHMS.HEAP_SORT:
        await this.heapSort();
        break;
      case SORTING_ALGORITHMS.COUNTING_SORT:
        await this.countingSort();
        break;
      case SORTING_ALGORITHMS.SHELL_SORT:
        await this.shellSort();
        break;
      case SORTING_ALGORITHMS.RADIX_SORT:
        await this.radixSort();
        break;
      case SORTING_ALGORITHMS.BUCKET_SORT:
        await this.bucketSort();
        break;
    }
    this.isSorting = false;
  }

  // delay in execution
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async bubbleSort() {
    const arr = this.histogramData;
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.currentIndex = j;
        this.compareIndex = j + 1;
        if (arr[j] > arr[j + 1]) {
          // Swap
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          this.histogramData = [...arr];
          await this.sleep(this.executionSpeed);
        }
      }
    }
    this.handleResetIndex();
  }

  async countingSort() {
    const arr = this.histogramData.map((v) => Math.floor(v));
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    for (const num of arr) {
      this.currentIndex = num;
      this.compareIndex = -1;
      count[num]++;
      await this.sleep(this.executionSpeed);
    }

    let index = 0;
    for (let i = 0; i < count.length; i++) {
      while (count[i]-- > 0) {
        this.currentIndex = index;
        this.compareIndex = i;
        arr[index++] = i;
        this.histogramData = [...arr];
        await this.sleep(this.executionSpeed);
      }
    }
    this.handleResetIndex();
  }

  async shellSort() {
    const arr = this.histogramData;
    let n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        let temp = arr[i];
        let j = i;
        while (j >= gap && arr[j - gap] > temp) {
          this.currentIndex = j;
          this.compareIndex = j - gap;
          arr[j] = arr[j - gap];
          j -= gap;
          this.histogramData = [...arr];
          await this.sleep(this.executionSpeed);
        }
        arr[j] = temp;
        this.histogramData = [...arr];
        await this.sleep(this.executionSpeed);
      }
      gap = Math.floor(gap / 2);
    }
    this.handleResetIndex();
  }

  async radixSort() {
    const arr = this.histogramData.map((v) => Math.floor(v));
    const getMax = (arr: number[]) => Math.max(...arr);
    const getDigit = (num: number, place: number) =>
      Math.floor(num / Math.pow(10, place)) % 10;

    let max = getMax(arr);
    let maxDigits = max.toString().length;

    for (let i = 0; i < maxDigits; i++) {
      const buckets: number[][] = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < arr.length; j++) {
        const digit = getDigit(arr[j], i);
        this.currentIndex = j;
        this.compareIndex = digit;
        buckets[digit].push(arr[j]);
        await this.sleep(this.executionSpeed / 5);
      }
      arr.length = 0;
      buckets.forEach((bucket) => arr.push(...bucket));
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
    }
    this.handleResetIndex();
  }

  async bucketSort() {
    const arr = this.histogramData;
    const n = arr.length;
    const numBuckets = 10;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = (max - min) / numBuckets;

    const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

    for (let i = 0; i < n; i++) {
      const index = Math.floor((arr[i] - min) / range);
      this.currentIndex = i;
      this.compareIndex = index;
      buckets[Math.min(index, numBuckets - 1)].push(arr[i]);
      await this.sleep(this.executionSpeed / 3);
    }

    for (let i = 0; i < buckets.length; i++) {
      buckets[i].sort((a, b) => a - b);
    }

    let index = 0;
    for (const bucket of buckets) {
      for (const value of bucket) {
        arr[index++] = value;
        this.currentIndex = index;
        this.compareIndex = -1;
        this.histogramData = [...arr];
        await this.sleep(this.executionSpeed);
      }
    }
    this.handleResetIndex();
  }

  async heapSort() {
    const arr = this.histogramData;
    const n = arr.length;

    const heapify = async (n: number, i: number) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;

      if (largest !== i) {
        this.currentIndex = i;
        this.compareIndex = largest;
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        this.histogramData = [...arr];
        await this.sleep(this.executionSpeed);
        await heapify(n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
      await heapify(i, 0);
    }
    this.handleResetIndex();
  }

  async quickSort(start = 0, end = this.histogramData.length - 1) {
    if (start >= end) return;

    const index = await this.partition(start, end);
    await this.quickSort(start, index - 1);
    await this.quickSort(index + 1, end);
    this.handleResetIndex();
  }

  async partition(start: number, end: number): Promise<number> {
    const arr = this.histogramData;
    const pivot = arr[end];
    let i = start;

    for (let j = start; j < end; j++) {
      if (arr[j] < pivot) {
        this.currentIndex = j;
        this.compareIndex = i;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        this.histogramData = [...arr];
        await this.sleep(this.executionSpeed);
        i++;
      }
    }
    [arr[i], arr[end]] = [arr[end], arr[i]];
    this.currentIndex = i;
    this.compareIndex = end;
    this.histogramData = [...arr];
    await this.sleep(this.executionSpeed);
    return i;
  }

  async mergeSort(start = 0, end = this.histogramData.length - 1) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await this.mergeSort(start, mid);
    await this.mergeSort(mid + 1, end);
    await this.merge(start, mid, end);
    this.handleResetIndex();
  }

  async merge(start: number, mid: number, end: number) {
    const arr = this.histogramData;
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      this.currentIndex = k;
      this.compareIndex = left[i] <= right[j] ? start + i : mid + 1 + j;
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
    }

    while (i < left.length) {
      this.currentIndex = k;
      this.compareIndex = start + i;
      arr[k++] = left[i++];
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
    }

    while (j < right.length) {
      this.currentIndex = k;
      this.compareIndex = mid + 1 + j;
      arr[k++] = right[j++];
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
    }
  }

  async selectionSort() {
    const arr = this.histogramData;

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      this.currentIndex = i;
      this.compareIndex = minIndex;
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
    }
    this.handleResetIndex();
  }

  async insertionSort() {
    const arr = this.histogramData;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        this.currentIndex = j + 1;
        this.compareIndex = j;
        arr[j + 1] = arr[j];
        j = j - 1;
        this.histogramData = [...arr];
        await this.sleep(this.executionSpeed);
      }

      arr[j + 1] = key;
      this.histogramData = [...arr];
      await this.sleep(this.executionSpeed);
    }
    this.handleResetIndex();
  }
}
