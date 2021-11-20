import { Button, Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function RecipeCreate(){
    return(
        <>
            <h1>Add a recipe</h1>
            <svg width="300" height="300" style={{marginBottom: "10px"}}>
                <rect width="300" height="300" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
            </svg>
            <br/>
            <Form>
                <Button type="primary" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700", marginBottom: "10px"}}>Add a picture</Button>
                <h1>Description</h1>
                <Form.Item name={['recipe', 'description']}>
                    <Input.TextArea showCount maxLength={250}/>
                </Form.Item>
                <h1>Ingredients</h1>
                <Form.List
                    name="ingredients"
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
                        {fields.map((field, index) => (
                        <Form.Item
                            required={true}
                            key={field.key}
                        >
                            <Form.Item
                            {...field}
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
                            <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
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
                    name="steps"
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
                        {stepFields.map((stepFields, index) => (
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
                    <Button type="primary" htmlType="submit" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700", marginBottom: "10px"}}>
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default RecipeCreate;