const datag = [
    {
        files: [
            {
                files: [
                    {
                        files: [
                            {
                                id: 2
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const findIndex = (id, data, index) => {
    if (data.files) {
        console.log(JSON.stringify(data.files))
        let indexValue = data.files.find((x) => x.id == id);
        console.log({ indexValue })
        if (indexValue) {
            return [...index, indexValue]
        }
        if (data.files)
            return findIndex(id, data.files[0], index)
    }
    return index
}

findIndex(1, datag[0], [])