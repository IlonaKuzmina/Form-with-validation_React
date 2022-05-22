import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.scss';

const allFormData = {
  name: '',
  mail: '',
  tel: '',
  gender: '',
  robot: '',
};

const Form = () => {
  const [inputValue, setInputValue] = useState(allFormData);
  const focusInput = useRef<HTMLInputElement | null>(null);
  console.log(inputValue);

  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, []);

  const onChange = (name: string, value: string) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSubmit = (e:any) => {
    const toastInfo = () => {
      toast.success('Your form is accepted', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    toastInfo();
    e.preventDefault();
  };

  const regName = new RegExp('^[A-Za-zs]{3,}[\\.]{0,1}[A-Za-z\\s]{0,}$');
  const regMale = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  const regTel = new RegExp('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{2})[-. )]*(\\d{2})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$');

  const validationHandler = (regex: RegExp, value:string) => (
    !regex.test(value)
      ? (
        <div className={styles.validation__container}>
          <span className={styles.error__text}>Name is not valid.</span>
        </div>
      )
      : (
        <div className={styles.validation__container}>
          <span className={styles.valid__text}>Name is valid.</span>
        </div>
      )
  );

  return (
    <div>
      <div className={styles.form__container}>
        <h1>Form</h1>
        <form
          action=""
          onSubmit={onSubmit}
        >
          <input
            className={styles.input}
            ref={focusInput}
            type="text"
            name="name"
            id="name"
            required
            placeholder="Fullname"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {validationHandler(regName, inputValue.name)}

          <input
            className={styles.input}
            type="email"
            name="mail"
            id="mail"
            required
            placeholder="E-mail"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {validationHandler(regMale, inputValue.mail)}

          <input
            className={styles.input}
            type="tel"
            name="tel"
            id="tel"
            required
            placeholder="Phone number"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {validationHandler(regTel, inputValue.tel)}

          <div className={styles.gender__container}>
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                required
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
              {' '}
              Male
            </label>

            <br />

            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                onChange={(e) => {
                  setInputValue({ ...inputValue, gender: e.target.value });
                }}
              />
              {' '}
              Female
            </label>
          </div>

          <div className={styles.robot__container}>
            <label htmlFor="robot">
              <input
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="checkbox"
                name="robot"
                required
                id="robot"
              />
              {' '}
              I am not robot
            </label>
          </div>

          <button
            className={styles.submit__btn}
            type="submit"
          >
            Submit

          </button>
        </form>
        {' '}

      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
