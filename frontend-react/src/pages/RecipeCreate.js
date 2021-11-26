import { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addRecipe } from "../store/actions";
import { Context } from "../store";
import { Button, Form, Input, Upload, message } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import "../index.less";

function RecipeCreate(){
    const history = useHistory();
    const [state, dispatch] = useContext(Context);
    var ingredientsArray = [];
    var amountsArray = [];

    const onFinish = (values) => {
        //console.log(values)
        for(var i=0;i<values.recipeIngredients.length;i++){
            ingredientsArray.push(values.recipeIngredients[i].ingredient)
            amountsArray.push(values.recipeIngredients[i].amount)
        }
        const newRecipe = {
            userName: state.auth.username,
            recipeName: values.recipeName,
            recipeDescription: values.recipeDescription,
            recipeSteps: values.recipeSteps,
            recipeIngredients: ingredientsArray,
            recipeIngredientAmount: amountsArray,
            recipePicture: "tegemata"
        };

        console.log(newRecipe)
            return fetch("http://localhost:8081/api/recipe/create",{
                method: "POST",
                body: JSON.stringify(newRecipe),
            headers: {"Content-Type":"application/json"}
            }).then(() => {
                displaySuccess("Recipe successfully created!")
                dispatch(addRecipe(newRecipe))
                return history.replace("/account")
            }).catch(error => {
                displayError(error);
        });
    }

    const displaySuccess = (success) => {
        message.success(success);
    }
    
    const displayError = (error) => {
        message.error(error.toString());
    }

    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
            message.success(`"${info.file.name}" uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`"${info.file.name}" upload failed.`);
            }
        },
        };

    if(state.auth.token == undefined || state.auth.token == null){
        return (
            <h1>Not logged in!</h1>
        )
    } else {
        return(
            <>
                <h1>Add a recipe</h1>
                <svg width="350" height="350" style={{marginBottom: "10px"}}>
                    <rect width="350" height="350" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
                </svg>
                <br/>
                <Form
                    name="createRecipe"
                    scrollToFirstError
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Add a picture</Button>
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