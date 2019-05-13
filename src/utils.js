import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

// 암호화된 secret 코드 생성
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// 메일 전송 설정 함수
export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

// 메일 전송 함수
export const sendSecretMail = (address, secret) => {
  const email = {
    from: "sangheongram@sangheongram.com",
    to: address,
    subject: "🔒Login Secret for Sangheongram🔒",
    html: `Hello Your login secret its [<strong>${secret}</strong>].<br/> 로그인을 위해 앱/웹 에 복사 후 붙여넣어주세요`
  };
  return sendMail(email);
};

// 토큰 생성 함수
export const generateToken = id => jwt.sign({ id: id }, process.env.JWT_SECRET);
