import React from 'react';
import { auth, provider } from '../Database/Pack';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';

import './Login.scss';

import { tokenfunc } from '../main/Redux/Index';
import axios from 'axios';
export default function Login() {
  let dispach = useDispatch();

  async function Signin() {
    signInWithPopup(auth, provider).then(async (result) => {
      dispach(tokenfunc(result.user));
      let res = await axios.post(
        `https://645673d55f9a4f2361448ff9.mockapi.io/Saved-Messages`,
        {
          name: result.user.displayName,
        },
      );
    });
  }
  return (
    <>
      <div className="loginbox">
        <div className="logo">
          <img
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-telegram-1-5645844-4695702.png"
            alt="logo"
          />
        </div>

        <div class="text-effect">
          <div class="wrapper">
            <div id="L" class="letter">
              T
            </div>
            <div class="shadow">T</div>
          </div>
          <div class="wrapper">
            <div id="I" class="letter">
              E
            </div>
            <div class="shadow">E</div>
          </div>
          <div class="wrapper">
            <div id="G" class="letter">
              L
            </div>
            <div class="shadow">L</div>
          </div>
          <div class="wrapper">
            <div id="H" class="letter">
              E
            </div>
            <div class="shadow">E</div>
          </div>
          <div class="wrapper">
            <div id="T" class="letter">
              G
            </div>
            <div class="shadow">G</div>
          </div>
          <div class="wrapper">
            <div id="N" class="letter">
              R
            </div>
            <div class="shadow">R</div>
          </div>
          <div class="wrapper">
            <div id="E" class="letter">
              A
            </div>
            <div class="shadow">A</div>
          </div>
          <div class="wrapper">
            <div id="S" class="letter">
              M
            </div>
            <div class="shadow">M</div>
          </div>
        </div>
        <button onClick={Signin}>LOGIN WITH GMAIL</button>
      </div>
    </>
  );
}
