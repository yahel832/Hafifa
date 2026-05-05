import './menu.css';
import Select from 'react-select'
import { categories, costumStyles, possibleDays } from '../data/select';
import "@fontsource/arimo/400.css";
import { Controller, FieldErrors, UseFormRegister, Control } from 'react-hook-form';

export const FormBody = (props: {register: UseFormRegister<{
                                        name: string;
                                        description: string;
                                        category: string;
                                        creator: string;
                                        weekdays: string[];
                                    }>, 
                          errors: FieldErrors<{
                                      name: string;
                                      description: string;
                                      category: string;
                                      creator: string;
                                      weekdays: string[];
                                  }>, 
                          control: Control<{
                                    name: string;
                                    description: string;
                                    category: string;
                                    creator: string;
                                    weekdays: string[];
                                }, any, {
                                    name: string;
                                    description: string;
                                    category: string;
                                    creator: string;
                                    weekdays: string[];
                                }>
}) => {
  return (
    <div>
      <div className="modal__field">
        <label className="modal__label">שם מוצר</label>
        <input
            className={`modal__input`}
            {...props.register("name", { required: "שדה חובה" })}
        />
        {props.errors.name && <p className="alert">{props.errors.name.message}</p>}
      </div>

      <div className="modal__field">
          <label className="modal__label">יום</label>
          <Controller
              name="weekdays"
              control={props.control}
              rules={{ required: "שדה חובה" }}
              defaultValue={[]}
              render={({ field }) => (
                  <Select
                      options={possibleDays}
                      isMulti
                      value={possibleDays.filter((day) => field.value.includes(day.value))}
                      onChange={(selected) => field.onChange(selected.map((option) => option.value))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      styles={costumStyles}
                      placeholder=""
                  />
              )}
          />
          {props.errors.weekdays && <p className="alert">{props.errors.weekdays.message}</p>}
      </div>

      <div className="modal__field">
          <label className="modal__label">קטגוריה</label>
          <Controller
              name="category"
              control={props.control}
              rules={{ required: "שדה חובה" }}
              render={({ field }) => (
                  <Select
                      options={categories}
                      value={categories.find((c) => c.value === field.value) ?? null}
                      onChange={(option) => field.onChange(option ? option.value : "")}
                      styles = {costumStyles}
                      placeholder=""
                  />
              )}
          />
          {props.errors.category && <p className="alert">{props.errors.category.message}</p>}
      </div>

      <div className="modal__field">
          <label className="modal__label">תיאור</label>
          <textarea
              className={`modal__textarea`}
              {...props.register("description", { required: "שדה חובה" })}
              rows={3}
          />
          {props.errors.description && <p className="alert">{props.errors.description.message}</p>}
      </div>

      <div className="modal__field">
          <label className="modal__label">יוצר המתכון</label>
          <input
              className={`modal__input`}
              {...props.register("creator", { required: "שדה חובה" })}
          />
          {props.errors.creator && <p className="alert">{props.errors.creator.message}</p>}
      </div>
    </div>
  )
}