import "./styles.css";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("メールアドレスの形式ではありません。")
    .required("入力必須の項目です。"),
  password: yup
    .string()
    .min(8, "8文字以上入力してください。")
    .max(32, "32文字以下を入力してください。"),
  select: yup
    .string()
    .oneOf(["one", "two", "three"], "選択してください。")
    .defined()
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  console.log("test");

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password" />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <select {...register("select")} defaultValue="">
            <option value="" disabled>
              Please Select
            </option>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
          </select>
          {<p>{errors.select?.message}</p>}
        </div>

        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
