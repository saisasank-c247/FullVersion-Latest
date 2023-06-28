import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useFormik } from "formik"
import React from "react"


export const TextFields = (props: any) => {
    const { item, formik, handleChange } = props
    return (
        <React.Fragment>
            <div>{item.label}</div>
            <TextField
                name={item.name}
                // value={formik.values[item.name]}
                onChange={(e: any) => handleChange(item.name, e)}
                helperText={formik.touched[item.name] && formik.error[item.name]}
                error={formik.touched[item.name] && Boolean(formik.error[item.name])}
            />
        </React.Fragment>
    )
}

// export const checkBox=(props:any)=>{
//     const {item , formik , handleChange}=props
//     return(
//         <React.Fragment>
//             <FormControlLabel name={item.name} control={<Checkbox name={item.name}  onChange={(e:any)=>handleChange(item.name ,e)} />} label="Click if you concent with this" />
//         </React.Fragment>
//     )
// }

export const RadioBtn = (props: any) => {
    const { item, formik, handleChange } = props
    return (
        <React.Fragment>
            <FormControl>
                {/* <FormLabel>{item.label}</FormLabel> */}

                    <FormControlLabel name={item.name} control={<Radio onChange={(e: any) => handleChange(item.name, e)} />} label={item.label} />
            
                {!!formik.touched[item.name] && formik.errors[item.name] && (<div style={{ color: "#EA5455", fontSize: '12px', fontWeight: 400 }}>
                    {formik.touched[item.name] && formik.errors[item.name]}
                </div>
                )}
            </FormControl>
        </React.Fragment>
    )
}

export const Form = (props: any) => {
    console.log(props, "sadfa");

    const { formFields, validationSchema } = props
    const formik = useFormik({
        initialValues: props.initialValues ? props.initialValues : {},
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            console.log("fgdfg", values)
        }
    });
    const handleChange = (field: any, value: any) => {
        formik.setFieldValue(field, value);
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                {formFields.map((item: any, index: number) => {
                    return (<CardContent>
                        {item.type == 'text' ?
                            <TextFields item={item} formik={formik} handleChange={handleChange} /> :
                            item.type == 'radio' ?
                                <RadioBtn item={item} formik={formik} handleChange={handleChange} /> : null}
                        {/* // item.type == 'checkbox'?
                // <checkBox item={item} formik={formik} handleChange={handleChange}/>: null} */}
                    </CardContent>)
                })}
                <Box component={'div'} sx={{ display: 'flex' }}>
                    <Box component='span' mr={2}>
                        <Button type="submit" variant="contained" color="secondary"> Submit</Button>
                    </Box>
                    <Box component='span' mr={2}>
                        <Button type="reset" variant="contained" color="secondary"> Cancel</Button>
                    </Box>
                </Box>
            </Card>
        </form>
    )
}