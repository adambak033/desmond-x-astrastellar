import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputForm } from "~/components/InputForm";
import { OutlineBtn } from "~/components/OutlineBtn";
import { api } from "~/utils/api";

const Todo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showEidt, setShowEidt] = useState(false);
  const [title, setTitle] = useState("");
  const [updateErrorMsg, setUpdateErrorMsg] = useState("");

  const updateTodo = api.todo.updateTodo.useMutation();

  const detailTodo = api.todo.getTodoById.useQuery({ id: parseInt(`${id}`) });
  const markChecked = api.todo.updateTodo.useMutation();
  const handleDelete = api.todo.deleteTodo.useMutation();

  return (
    <>
      <Head>
        <title>Todo Detail - Test Desmond for Astrastellar</title>
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
              Todo Detail
            </h1>
            {updateErrorMsg !== "" ? (
              <div className="color-white mt-2 rounded-md bg-red-300 p-2 text-center">
                <p>{updateErrorMsg}</p>
              </div>
            ) : (
              <div />
            )}
            <div className="mt-4 mb-2 text-center">
              <div className="mb-2 flex justify-center text-center">
                <span className="mr-2 font-bold">Title: </span>
                <p
                  className={
                    detailTodo.data?.isCompleted
                      ? "flex items-center text-green-500 line-through"
                      : "flex items-center"
                  }
                >
                  {detailTodo.data?.title}
                </p>
              </div>
              <div>
                <p onClick={() => console.log(`Id ${id}`)}>
                  <span className="mr-3 font-bold">Completed:</span>
                  <input
                    checked={detailTodo.data?.isCompleted ?? false}
                    type="checkbox"
                    onClick={() => {
                      markChecked.mutate({
                        id: parseInt(`${detailTodo.data?.id}`),
                        title: `${detailTodo.data?.title}`,
                        isCompleted: !detailTodo.data?.isCompleted,
                      });

                      router.reload();
                    }}
                    className="mr-2 checked:bg-blue-500 enabled:hover:border-gray-400"
                  />
                </p>
              </div>
            </div>
            {showEidt ? (
              <InputForm
                placeholder="Edit todo"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            ) : (
              <></>
            )}
            <div className="mt-2 flex items-center justify-center">
              {showEidt ? (
                <OutlineBtn
                  label="Update"
                  style={{
                    marginRight: "15px",
                    borderColor: "green",
                    borderWidth: "1px",
                    color: "green",
                  }}
                  onClick={() => {
                    setShowEidt(false);

                    // check for required field
                    if (title !== "") {
                      updateTodo.mutate({
                        id: parseInt(`${id}`),
                        title: title,
                        isCompleted: false,
                      });
                      setTitle("");
                      setUpdateErrorMsg("");

                      router.back();
                    } else {
                      setUpdateErrorMsg("Todo can't be empty");
                    }
                  }}
                />
              ) : (
                <OutlineBtn
                  label="Edit"
                  style={{
                    marginRight: "15px",
                    borderColor: "red",
                    borderWidth: "1px",
                    color: "red",
                  }}
                  onClick={() => {
                    setShowEidt(true);
                    setTitle(`${detailTodo.data?.title}`);
                  }}
                />
              )}
              <OutlineBtn
                label="Delete"
                style={{
                  marginRight: "15px",
                  borderColor: "red",
                  borderWidth: "1px",
                  color: "red",
                }}
                onClick={() => {
                  handleDelete.mutate({
                    id: parseInt(`${detailTodo.data?.id}`),
                  });
                  router.back();
                }}
              />
              <OutlineBtn
                label="Back"
                style={{
                  borderColor: "gray",
                  borderWidth: "1px",
                  color: "gray",
                }}
                onClick={() => {
                  router.back();
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Todo;
