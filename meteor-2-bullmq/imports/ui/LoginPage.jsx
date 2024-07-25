import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export const LoginPage = () => {
  const [username, setUsername] = useState("zcloud");
  const [password, setPassword] = useState("zcloud");
  const [logged, setLogged] = useState(!!Meteor.userId());
  const login = () => {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        console.log(`Error logging in: ${err}`);
      } else {
        console.log(`Logged in as ${username}`);
      }
      setLogged(!!Meteor.userId());
    });
  };
  const logout = () => {
    Meteor.logout(() => {
      setLogged(!!Meteor.userId());
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="zCloud"
            src="https://zcloud-static-assets.s3.amazonaws.com/zcloud-images/zcloud-logo.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
            Meteor with BullMQ sample
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!logged && (
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-100"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={login}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
          {logged && (
            <form action="#" method="POST" className="space-y-6">
              <div>
                <div className="flex items-center justify-center">
                  <a href="/bullmq/ui">BullMQ Board: /bullmq/ui</a>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Logout
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
