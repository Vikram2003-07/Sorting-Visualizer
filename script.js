const arrayContainer=document.getElementById("array-container");
const generateArraybtn=document.getElementById("generateArraybtn");
const bubbleSortbtn=document.getElementById("bubbleSortbtn");
const SelectionSortbtn=document.getElementById("SelectionSortbtn");
const insertionSortbtn = document.getElementById("insertionSortbtn");
const mergeSortbtn = document.getElementById("mergeSortbtn");
const quickSortbtn = document.getElementById("quickSortbtn");
const stopBtn = document.getElementById("stopBtn");

const stop = () => {
    window.location.reload();
};

const disableButtons = () => {
    generateArraybtn.disabled = true;
    bubbleSortbtn.disabled = true;
    SelectionSortbtn.disabled = true;
    insertionSortbtn.disabled = true;
    mergeSortbtn.disabled = true;
    quickSortbtn.disabled = true;
};

const enableButtons = () => {
    generateArraybtn.disabled = false;
    bubbleSortbtn.disabled = false;
    SelectionSortbtn.disabled = false;
    insertionSortbtn.disabled = false;
    mergeSortbtn.disabled = false;
    quickSortbtn.disabled = false;
};

//generating new array
const generateArray=()=>{
    arrayContainer.innerHTML="";
    for(let i=0;i<30;i++){                      //~~ means Math.floor()
        const barHeight=~~(Math.random()*80)+20;//calculating random height between 20% and 100%
        //console.log(barHeight);
        const arrayBar=document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height="0%";
        arrayContainer.appendChild(arrayBar);
        setTimeout(() => {
            arrayBar.style.height =`${barHeight}%`;
        }, 30);
    }
};
//bubble sort
const bubblesort=async()=>{
    disableButtons();
    const bars=document.querySelectorAll(".array-bar");
    for(let i=0;i<bars.length-1;i++)
    {
        for(j=0;j<bars.length-i-1;j++)
        {
            bars[j].style.backgroundColor="#ff6f61";
            bars[j+1].style.backgroundColor="#ff6f61";
            if(parseInt(bars[j].style.height)>parseInt(bars[j+1].style.height))
            {
                await swap(bars[j],bars[j+1]);
            }
            bars[j].style.backgroundColor="white";  //resting the color
            bars[j+1].style.backgroundColor="white";
        }
        bars[bars.length-i-1].style.backgroundColor="rgb(28, 249, 146)";
    }
    bars[0].style.backgroundColor="rgb(28, 249, 146)";

    enableButtons();
};

// Selection Sort
const selectionSort = async () => {
    disableButtons();
    const bars = document.querySelectorAll(".array-bar");

    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = "#ff6f61"; // Highlight current minimum

        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = "#ff6f61"; // Highlight the comparison
            await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                // Reset the previous minimum if it is not the currently selected element
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = "white"; 
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = "#ff6f61"; // Highlight new min
            } else {
                bars[j].style.backgroundColor = "white"; // Reset color of non-min
            }
        }

        if (minIndex !== i) {
            await swap(bars[i], bars[minIndex]); // Swap elements
        }

        bars[i].style.backgroundColor = "rgb(28, 249, 146)"; // Mark sorted element
    }

    // Ensure the last element is also marked sorted
    bars[bars.length - 1].style.backgroundColor = "rgb(28, 249, 146)";

    enableButtons();
};
//Insertion sort
const insertionSort = async () => {
    disableButtons();
    const bars = document.querySelectorAll(".array-bar");

    bars[0].style.backgroundColor = "rgb(28, 249, 146)"; // Ensure the first element is green
    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;
        bars[i].style.backgroundColor = "#ff6f61"; // Mark the key element
        
        await new Promise(resolve => setTimeout(resolve, 50));

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j + 1].style.height = bars[j].style.height;
            j--;
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        bars[j + 1].style.height = `${key}%`;
        bars[i].style.backgroundColor = "rgb(28, 249, 146)"; // Sorted element
    }
    enableButtons();
};

// Merge Sort
const mergeSort = async () => {
    disableButtons();
    const bars = document.querySelectorAll(".array-bar");
    let heights = Array.from(bars, bar => parseInt(bar.style.height));

    await mergeSortHelper(heights, 0, heights.length - 1, bars);
    
    enableButtons();
};

const mergeSortHelper = async (arr, left, right, bars) => {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    
    await mergeSortHelper(arr, left, mid, bars);
    await mergeSortHelper(arr, mid + 1, right, bars);
    
    await merge(arr, left, mid, right, bars);

    for (let i = left; i <= right; i++) {
        bars[i].style.height = `${arr[i]}%`;
        bars[i].style.backgroundColor = "rgb(28, 249, 146)"; // Final sorted color
    }
};


const merge = async (arr, left, mid, right, bars) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        bars[k].style.backgroundColor = "#ff6f61"; // Highlight comparison
        await new Promise(resolve => setTimeout(resolve, 50));

        if (leftArr[i] < rightArr[j]) {
            arr[k] = leftArr[i];
            bars[k].style.height = `${leftArr[i]}%`;
            i++;
        } else {
            arr[k] = rightArr[j];
            bars[k].style.height = `${rightArr[j]}%`;
            j++;
        }
        bars[k].style.backgroundColor = "rgb(28, 249, 146)"; // Sorted color
        k++;
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        bars[k].style.height = `${leftArr[i]}%`;
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        bars[k].style.height = `${rightArr[j]}%`;
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
};

// Quick Sort
const quickSort = async () => {
    disableButtons();
    const bars = document.querySelectorAll(".array-bar");
    let heights = Array.from(bars, bar => parseInt(bar.style.height));

    await quickSortHelper(heights, 0, heights.length - 1, bars);
    
    enableButtons();
};

const quickSortHelper = async (arr, low, high, bars) => {
    if (low < high) {
        let pivotIndex = await partition(arr, low, high, bars);
        
        await quickSortHelper(arr, low, pivotIndex - 1, bars);
        await quickSortHelper(arr, pivotIndex + 1, high, bars);

        // Mark elements as sorted (green)
        for (let i = low; i <= high; i++) {
            bars[i].style.backgroundColor = "rgb(28, 249, 146)"; 
        }
    }
};

const partition = async (arr, low, high, bars) => {
    let pivot = arr[high];
    bars[high].style.backgroundColor = "#ff6f61"; // Pivot color
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "#ff6f61"; // Comparison color
        await new Promise(resolve => setTimeout(resolve, 50));

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = `${arr[i]}%`;
            bars[j].style.height = `${arr[j]}%`;
        }
        bars[j].style.backgroundColor = "white"; // Reset color
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1]}%`;
    bars[high].style.height = `${arr[high]}%`;

    bars[high].style.backgroundColor = "white"; // Reset pivot color
    bars[i + 1].style.backgroundColor = "rgb(28, 249, 146)"; // Correctly placed pivot is green
    return i + 1;
};

//swaping the elements
const swap=(bar1,bar2)=>{
    return new Promise((resolve)=>{
        const temp=bar1.style.height;
        bar1.style.height=bar2.style.height;
        bar2.style.height=temp;
        setTimeout(()=>{
            resolve();
        },60); //delay the swap for 300millisecond
    });
};

generateArray();//when page get loaded it generats an array