import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useAppDispatch } from '../apps/hooks';
import TodoList from '../components/TodoList';
import { addTodo } from '../features/todosSlice';

type FormValues = {
  title: string;
};

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [todoType, setTodoType] = useState('all');

  const handleSubmitTodo = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    if (values.title) {
      dispatch(addTodo({ id: uuidv4(), title: values.title, isDone: false }));
      resetForm({ values: { title: '' } });
    }
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = String(e.target.value);
    setTodoType(value);
  };

  const TodoSchema = Yup.object().shape({
    title: Yup.string()
      .min(8, 'Should be 8 character long')
      .max(40, 'Should not exceed 40 characters')
      .required('Required'),
  });

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo app created by Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container d-flex flex-column">
        <div className="mx-auto" style={{ width: '100%', maxWidth: '400px' }}>
          <h1 className="text-center">Todos List</h1>

          <Formik
            initialValues={{ title: '' }}
            validationSchema={TodoSchema}
            onSubmit={handleSubmitTodo}
          >
            {({ errors, touched, handleSubmit }: FormikProps<FormValues>) => (
              <Form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                  <Field
                    name="title"
                    className="form-control"
                    placeholder="New Task"
                  />

                  <button className="btn btn-outline-secondary" type="submit">
                    Add
                  </button>
                </div>
                {errors.title && touched.title && (
                  <small className="fw-lighter ">{errors.title}</small>
                )}
              </Form>
            )}
          </Formik>

          <div className="input-group input-group-sm mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>

          <div className="input-group input-group-sm mb-3">
            <select
              className="form-select"
              value={todoType}
              onChange={handleChangeFilter}
            >
              <option value="all">All</option>
              <option value="undone">Uncompleted</option>
              <option value="done">Completed</option>
            </select>
            <span className="input-group-text">Filter</span>
          </div>

          <TodoList searchText={searchText} todoType={todoType} />
        </div>
      </div>
    </>
  );
};

export default Home;
