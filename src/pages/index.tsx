import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Todo App - Test Ophelia for Astrastellar</title>
        <meta name="description" content="Hello Ophelia, hope you're doing good ! This is your test, we hope that you'll succeed !" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl text-white max-w-2xl text-center font-bold">Hello Ophelia, I want you to create the Next Best Todo App of the World (joke)</h1>
        <div className="mt-10 text-white text-center">
          <h2 className="text-3xl font-bold">Your mission</h2>
          <p>Ophelia, you will have to create a basic CRUD app for a todo.</p>
          <p>So, on this page, we want all the task already created, you can edit them or delete it</p>
          <p>When you click on a task, you can go to a page under /task/[id] for instance in which you have the details of the todo (just to see if you master routing system)</p>
          <p>You have to use Prisma to manage the database which is an SQLite database (by default it is) and to store the todos</p>
          <p>You have to use ReactQuery to query the database route defined on tRPC backend under the dir /server</p>
          <p>That&apos;all, you can delete these instructions once understood</p>
        </div>
        <div className="flex flex-col w-full gap-5 max-w-3xl text-left my-20">
          <h3 className="text-white text-2xl font-semibold">Todo:</h3>
          {/* The Next of the todo here, good luck Ophelia :) */}
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
    { enabled: sessionData?.user !== undefined },
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
