import { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";
import { useAppSelector, useAppDispatch } from "./store";
import {
  addTask,
  setSelectedTask,
  storedTaskLocally,
  updateTask,
} from "./counterSlice";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/en";
import "./createTask.css";

function CreateTask({
  setCreateTaskModal,
}: {
  setCreateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  dayjs.extend(localeData);
  dayjs.extend(weekday); // Include this if you are working with weekdays
  dayjs.locale("en");
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { tasks, selectedTask } = useAppSelector((state) => state.board);

  type FieldType = {
    title?: string;
    description?: string;
    dueDate?: any;
    tags: string[];
  };

  const onFinish = (values: FieldType) => {
    //Updating Task in edit mode
    if (selectedTask) {
      dispatch(
        updateTask({
          ...values,
          id: selectedTask.id,
          status: selectedTask.status,
          dueDate: values.dueDate.format("ddd MMM DD YYYY"),
          creationDate: new Date().toDateString(),
        })
      );
    } else {
      //Creating Task

      dispatch(
        addTask({
          ...values,
          creationDate: new Date().toDateString(),
          dueDate: values.dueDate.format("ddd MMM DD YYYY"),
          id: tasks.length + 1,
          status: "to-do",
          tags: values.tags,
        })
      );
      console.log("tasks", tasks);
    }
    setCreateTaskModal(false);
    form.resetFields();
    dispatch(setSelectedTask(undefined));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleFormChange = (changedValues: any, allValues: FieldType) => {
    const { title, description, dueDate } = allValues;

    if (title && description && dueDate) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };
  const transformDataForForm = (data: any) => {
    if (!data) return;
    return {
      ...data,
      dueDate: dayjs(data.dueDate, "ddd MMM DD YYYY").isValid()
        ? dayjs(data.dueDate, "ddd MMM DD YYYY")
        : null, // Handle invalid dates
    };
  };

  useEffect(() => {
    if (selectedTask) {
      form.setFieldsValue(transformDataForForm(selectedTask));
    } else form.resetFields();
  }, [selectedTask]);

  return (
    <>
      {
        <Form
          name="createTaskForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
          }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleFormChange}
          autoComplete="off"
          initialValues={transformDataForForm(selectedTask) || {}}
          clearOnDestroy
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Please input the due date!" }]}
          >
            <DatePicker />
          </Form.Item>

          {/* Updated Tag Selector */}
          <Form.Item<FieldType>
            label="Tags"
            name="tags"
            rules={[{ required: false }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select or add tags"
              options={[
                { value: "front-end", label: "Front end" },
                { value: "back-end", label: "Back end" },
              ]}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  );
}
export default CreateTask;
