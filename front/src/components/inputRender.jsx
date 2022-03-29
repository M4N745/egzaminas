import Select from 'react-select'
import style from '../assets/css/components/inputRender.module.css'
export default function InputRender ({
    type,
    inputName,
    change,
    value ='',
    options = []
}){


    let input;

    if (type === 'text'){
        input = (
            <input
                type='text'
                className={style.input}
                value={value}
                onChange={(e) => {
                    let newValue = [];
                    newValue[inputName] = e.target.value;
                    change((prev) => ({...prev, ...newValue}));
                }}
            />
        );
    }
    if (type === 'password'){
        input = (
            <input
                type='password'
                className={style.input}
                value={value}
                onChange={(e) => {
                    let newValue = [];
                    newValue[inputName] = e.target.value;
                    change((prev) => ({...prev, ...newValue}));
                }}
            />
        );
    }
    if (type === 'select') {
        input = (
            <Select
                options={options}
            />
        );
    }

    return (
        <div>
            {input}
        </div>
    );

}