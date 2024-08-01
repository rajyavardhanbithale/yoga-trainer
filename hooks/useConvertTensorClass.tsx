
function useConvertTensorClass(threshold_num: number) {

    // To be implemented
    const threshold: number = threshold_num

    const setClass = (set:number,index:number) => {
        switch (set){
            case 1:
                const set1: Array<string> = ["downdog", "tree", "warrior1"]
                return set1[index]            
                
            case 2:
                const set2: Array<string> = ['goddess','mountain','warrior2']
                return set2[index]

            default:
                return "none"
        }
    }


    const getPredictionClass = (predAssumption: string, set: number) => {
        const arr = predAssumption.split(',')
        const numericArr = arr.map(parseFloat);


        const getNonZeroIndex = numericArr.filter(item => item !== 0).length

        switch (getNonZeroIndex) {
            case 1:
                const max = Math.max(...numericArr)
                const maxIndex = numericArr.indexOf(max)
                return setClass(set,maxIndex)

            case 2:
                const min = Math.min(...numericArr.filter(item => item !== 0))
                const minIndex = numericArr.indexOf(min)
                return setClass(set,minIndex)

            case 3:
                return "none"

            default:
                return "none"

        }
    }

    return { getPredictionClass }
}

export default useConvertTensorClass