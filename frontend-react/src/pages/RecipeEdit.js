import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../store";
import { Button, Form, Input, Upload, message, Card, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { updateRecipes, removeRecipe } from "../store/actions";
import "./pageStyles.css"

function RecipeEdit(){
    const {recipeID} = useParams();
    const history = useHistory();
    const [state, dispatch] = useContext(Context);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { confirm } = Modal;
    const mappedIngredients = [];
    const initialState = {
        fileList: []
    }
    const [fileList, setFileList] = useState({...initialState});
    const newRecipeData = new FormData()
    

    useEffect(() => {
        fetch("http://localhost:8081/api/recipe/" + recipeID
        ).then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Error fetching the recipe!");
            }
        }).then((data) => {
            setData(data)
            dataMapping(data);
            form.setFieldsValue({
                recipeName: data.recipeName,
                recipeDescription: data.recipeDescription,
                recipeIngredientField: mappedIngredients,
                recipeSteps: data.recipeSteps
            });
        }).catch(error => {
            message.error(error.toString());
        });
    }, [])

    const dataMapping = (data) => {
        for(var i=0; i<data.recipeIngredients.length; i++){
            mappedIngredients.push({
                ingredient: data.recipeIngredients[i],
                amount: data.recipeIngredientAmount[i]
            })
        }
    }

    const onFinish = (values) => {
        createFormData(values);
        return fetch("http://localhost:8081/api/recipe/update/" + recipeID,{
            method: "POST",
            body: newRecipeData,
        }).then((response) => {
            if(response.ok){
                message.success("Recipe successfully updated!")
                dispatch(updateRecipes(newRecipeData))
                return history.replace("/account")
            } else {
                throw new Error("Error posting the recipe!")
            }
        }).catch(error => {
            message.error(error);
        });
    }

    const createFormData = (values) => {
        if(fileList.fileList.length > 0){ //file
            const prevImage = data.imageURL.split("images/");
            newRecipeData.append("userName", state.auth.username)
            newRecipeData.append("recipeName", values.recipeName)
            newRecipeData.append("recipeDescription", values.recipeDescription)
            for(var i=0; i<values.recipeIngredientField.length; i++){
                newRecipeData.append("recipeIngredients", values.recipeIngredientField[i].ingredient)
                newRecipeData.append("recipeIngredientAmount", values.recipeIngredientField[i].amount)
            }
            for(var i=0; i<values.recipeSteps.length; i++){
                newRecipeData.append("recipeSteps", values.recipeSteps[i])
            }
            newRecipeData.append("image", fileList.fileList[0].originFileObj)
            newRecipeData.append("prevImage", prevImage[1])
            console.log(prevImage[1])
            newRecipeData.append("_method", "PUT")
        } else { //no file
            newRecipeData.append("userName", state.auth.username)
            newRecipeData.append("recipeName", values.recipeName)
            newRecipeData.append("recipeDescription", values.recipeDescription)
            for(var i=0; i<values.recipeIngredientField.length; i++){
                newRecipeData.append("recipeIngredients", values.recipeIngredientField[i].ingredient)
                newRecipeData.append("recipeIngredientAmount", values.recipeIngredientField[i].amount)
            }
            for(var i=0; i<values.recipeSteps.length; i++){
                newRecipeData.append("recipeSteps", values.recipeSteps[i])
            }
            newRecipeData.append("_method", "PUT")
        }
    }

    const deleteRecipe = () => {
        const prevImage = data.imageURL.split("images/");
        var bodyData = {
            recipeID: recipeID,
            filename: prevImage[1]
        }
        console.log(bodyData)
        return fetch("http://localhost:8081/api/recipe/delete/",{
            method: "DELETE",
            body: JSON.stringify(bodyData),
            headers: {"Content-Type":"application/json"}
        }).then((response) => {
            if(response.ok){
                message.success("Recipe successfully deleted!")
                dispatch(removeRecipe(recipeID))
                return history.replace("/account")
            } else {
                throw new Error("Error deleting the recipe!")
            }
        }).catch(error => {
            message.error(error);
        });
    }

    const handleChange = info => {
        let infoList = [...info.fileList];
        infoList = infoList.slice(-1);
        setFileList({ fileList: [infoList[0]] });
    }

    const handleRemoval = () => {
        setFileList({...initialState});
        return false;
    }

    const deleteWarning = () => {
        confirm({
            visible: {isModalVisible},
            content: (<b>Are you sure you want to delete the recipe?</b>),
            onOk(){
                deleteRecipe()
                setIsModalVisible(false);
            },
            onCancel(){
                setIsModalVisible(false);
            },
            okText: "Delete",
        });
        
    }

    if(state.auth.token == undefined || state.auth.token == null){
        return (
            <h1>Not logged in!</h1>
        )
    } else {
        return(
            <>
                <h1>Add a recipe</h1>
                <Form
                    form={form}
                    name="createRecipe"
                    scrollToFirstError
                    onFinish={onFinish}
                >
                <div>
                    <img src={data.imageURL} width="100" height="100" style={{marginBottom: "10px", float:"left", marginLeft: "70px"}}/>
                    <Form.Item>
                        <Upload
                            name="image"
                            accept=".jpg,.png,.jpeg"
                            onChange={handleChange}
                            onRemove={handleRemoval}
                            beforeUpload={() => false}
                            fileList={fileList.fileList}
                            listType="picture-card"
                            >
                            {fileList.fileList.length < 1 && <div ><PlusOutlined/><div >Replace</div></div>}
                        </Upload>
                    </Form.Item>
                </div>
                    <h1 style={{marginTop: "10px"}}>Recipe name</h1>
                    <Form.Item
                        name="recipeName"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input a recipe name!.",
                            },
                            {
                                max: 100,
                                message: "Maximum characters: 100",
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <h1 style={{marginTop: "10px"}}>Description</h1>
                    <Form.Item 
                        name="recipeDescription"
                        rules={[
                            {
                            required: true,
                            whitespace: true,
                            message: "Please input a description!.",
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={250}/>
                    </Form.Item>
                    <h1>Ingredients</h1>
                    <Form.List
                        name="recipeIngredientField"
                        rules={[
                        {
                            validator: async (_, names) => {
                            if (!names || names.length < 2) {
                                return Promise.reject(new Error('At least 2 ingredients!'));
                            }
                            },
                        },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map(field => (
                            <Form.Item
                                required={true}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'ingredient']}
                                    fieldKey={[field.fieldKey, 'ingredient']}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input an ingredient or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Ingredient" style={{ width: '60%' }} />
                                </Form.Item>
                                <Form.Item
                                    validateTrigger={['onChange', 'onBlur']}
                                    name={[field.name, 'amount']}
                                    fieldKey={[field.fieldKey, 'amount']}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input an amount or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Amount" style={{ width: '30%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                                ) : null}
                            </Form.Item>
                            
                            ))}
                            <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Add an ingredient
                            </Button>
                            <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                    <h1>Steps</h1>
                    <Form.List
                        name="recipeSteps"
                        rules={[
                        {
                            validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 1 step!'));
                            }
                            },
                        },
                        ]}
                    >
                        {(stepFields, { add, remove }, { errors }) => (
                        <>
                            {stepFields.map((stepFields) => (
                            <Form.Item
                                required={true}
                                key={stepFields.key}
                            >
                                <Form.Item
                                {...stepFields}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "Please add a step or delete this field.",
                                    },
                                ]}
                                noStyle
                                >
                                <Input.TextArea showCount maxLength={300}/>
                                </Form.Item>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(stepFields.name)}
                                    style={{ float: "right" }}
                                />
                            </Form.Item>
                            
                            ))}
                            <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Add step
                            </Button>
                            <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                <p onClick = {deleteWarning} style={{cursor:"pointer", color:"#FBDB14"}}>Delete recipe</p>
            </>
        );
    }
    
}

export default RecipeEdit;