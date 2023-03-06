import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { InputForm } from "~/components/InputForm";
import { OutlineBtn } from "~/components/OutlineBtn";
import { TodoItem } from "~/components/TodoItem";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // api
  const newTodo = api.todo.addTodo.useMutation();
  const { data: todos } = api.todo.getTodos.useQuery();

  const markChecked = api.todo.updateTodo.useMutation();
  const handleDelete = api.todo.deleteTodo.useMutation();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Todo App - Test Desmond for Astrastellar</title>
        <meta
          name="description"
          content="Hello Desmond, hope you're doing good ! This is your test, we hope that you'll succeed !"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="m-4 w-full rounded bg-white p-6 shadow lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest text-center font-bold">
              Todo List
            </h1>
            <div className="mt-4 flex">
              <InputForm
                placeholder="Add todo"
                value={todoTitle}
                onChange={(e) => {
                  setTodoTitle(e.target.value);
                }}
              />
              <OutlineBtn
                label="Add"
                onClick={() => {
                  // check validation
                  if (todoTitle !== "") {
                    newTodo.mutate({ title: todoTitle, isCompleted: false });
                    setTodoTitle("");
                    setErrorMsg("");

                    router.reload();
                  } else {
                    setErrorMsg("Todo can't be empty");
                  }
                }}
              />
            </div>
            {errorMsg !== "" ? (
              <div className="color-white mt-2 rounded-md bg-red-300 p-2 text-center">
                <p>{errorMsg}</p>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div>
            {/* list all todos */}
            {todos?.map((todo, indx) => (
              <TodoItem
                key={indx}
                id={todo.id}
                title={todo.title}
                iscompleted={todo.isCompleted ?? false}
                onChecked={() => {
                  markChecked.mutate({
                    id: parseInt(`${todo.id}`),
                    title: todo.title,
                    isCompleted: !todo.isCompleted,
                  });

                  router.reload();
                }}
                onDelete={() => {
                  handleDelete.mutate({
                    id: parseInt(`${todo.id}`),
                  });
                  router.reload();
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
