import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../store";
import { Button, Form, Input, Upload, message, Card, Checkbox, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { addRecipe } from "../store/actions";
import "./pageStyles.css"

function RecipeCreate(){
    const history = useHistory();
    const [state, dispatch] = useContext(Context);
    const initialState = {
        fileList: []
    }
    const [fileList, setFileList] = useState({...initialState});
    const newRecipeData = new FormData()


    const onFinish = (values) => {
        createFormData(values);
        return fetch("http://localhost:8081/api/recipe/create",{
            method: "POST",
            body: newRecipeData
        }).then((response) => {
            if(response.ok){
                message.success("Recipe successfully created!")
                dispatch(addRecipe(newRecipeData))
                return history.replace("/account")
            } else {
                throw new Error("Error posting the recipe!")
            }
        }).catch(error => {
            message.error(error);
        });
    }

    const createFormData = (values) => {
        newRecipeData.append("userName", state.auth.username)
        newRecipeData.append("recipeName", values.recipeName)
        newRecipeData.append("recipePrivacy", values.recipePrivacy)
        newRecipeData.append("recipeType", values.recipeType)
        newRecipeData.append("recipeDescription", values.recipeDescription)
        for(var i=0; i<values.recipeIngredients.length; i++){
            newRecipeData.append("recipeIngredients", values.recipeIngredients[i].ingredient)
            newRecipeData.append("recipeIngredientAmount", values.recipeIngredients[i].amount)
        }
        for(var i=0; i<values.recipeSteps.length; i++){
            newRecipeData.append("recipeSteps", values.recipeSteps[i])
        }
        newRecipeData.append("image", fileList.fileList[0].originFileObj)
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

    const props = {
        /*showUploadList: {
            showPreviewIcon: false
        }*/
    }

    if(state.auth.token == undefined || state.auth.token == null){
        return (
            <h1>Not logged in!</h1>
        )
    } else {
        return(
            <>
                <h1>Add a recipe</h1>
                <br/>
                <Form
                    name="createRecipe"
                    scrollToFirstError
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Upload
                            {...props}
                            accept=".jpg,.png,.jpeg"
                            onChange={handleChange}
                            onRemove={handleRemoval}
                            beforeUpload={() => false}
                            fileList={fileList.fileList}
                            listType="picture-card"
                            style={{minWidth:"1000px"}}
                            >
                            
                            {fileList.fileList.length < 1 && <div ><PlusOutlined/><div >Upload</div></div>}
                        </Upload>
                    </Form.Item>
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
                    <h1 style={{marginTop: "10px"}}>Type of Recipe</h1>
                    <Form.Item 
                        name="recipeType"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Select>
                            <Select.Option value="Chicken">Chicken</Select.Option>
                            <Select.Option value="Beef">Beef</Select.Option>
                            <Select.Option value="Vegan">Vegan</Select.Option>
                            <Select.Option value="Fish">Fish</Select.Option>
                            <Select.Option value="Vegetarian">Vegetarian</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
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
                        name="recipeIngredients"
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
                            if (!names || names.length < 2) {
                                return Promise.reject(new Error('At least 2 steps!'));
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

                    <h1 style={{marginTop: "10px"}}>Would you like to share this recipe with others?<br/>(Show this recipe on the main page)</h1>
                    <Form.Item 
                        name="recipePrivacy"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Select>
                            <Select.Option value="Private">Private</Select.Option>
                            <Select.Option value="Shared">Shared</Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    
}

export default RecipeCreate;