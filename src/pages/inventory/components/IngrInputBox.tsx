import { ReactComponent as IconBack } from '@/assets/icons/icon-back.svg';
import { ReactComponent as IconDelete } from '@/assets/icons/icon-minus.svg';
import DesignSystem from '@/utils/designSystem';
import { useComposing } from '@/utils/hooks';
import globalStyles from '@/utils/styles';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import moment, { Moment } from 'moment';
import 'moment/dist/locale/ko';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { IngredientDataType } from '..';
import '../react_dates_overrides.css';
const styles = {
  box: css({
    backgroundColor: DesignSystem.Color.background.gray,
    width: 1080,
    borderRadius: '12px',
    padding: '17.5px 24px',
    boxSizing: 'border-box',
  }),
  input: {
    default: css(DesignSystem.Text.body, {
      color: DesignSystem.Color.background.black,
      width: 222,
      height: 35,
      lineHeight: '35px',
      padding: 0,
      '&::placeholder': { color: DesignSystem.Color.text.gray },
    }),
    calender: css(
      globalStyles.center,
      globalStyles.button,
      DesignSystem.Text.subtitle,
      { width: '100%', height: 65 },
    ),
  },
  ingredients: css({
    backgroundColor: DesignSystem.Color.background.white,
    padding: '61px 0 61px 43px',
  }),
};
interface IngrInputBoxProps extends HTMLAttributes<HTMLDivElement> {
  type: 'input' | 'edit' | 'list';
  item?: IngredientDataType;
  submit?: boolean;
  handleDataChange?: (inputData: IngredientDataType) => void;
  hanldeEdit?: (input: IngredientDataType) => void;
  handleRemove?: () => void;
}
function IngrInputBox({
  type,
  item,
  submit,
  handleDataChange,
  hanldeEdit,
  handleRemove,
  style,
  ...props
}: IngrInputBoxProps) {
  moment.locale('ko');
  const [expirationDate, setExpirationDate] = useState<Moment | null>(null);
  const [inputData, setInputData] = useState<IngredientDataType>({
    name: item?.name || '',
    quantity: item?.quantity || '',
    registrationDate: moment(),
    expirationDate: item?.expirationDate || expirationDate,
  });
  const [isComposing, composeProps] = useComposing();

  const handleKeyDown =
    type === 'input'
      ? (e: React.KeyboardEvent) => {
          if (isComposing) return;

          if (e.code === 'Enter' && inputData.name) {
            handleDataChange && handleDataChange(inputData);
            setExpirationDate(null);
            setInputData({
              name: '',
              quantity: '',
              registrationDate: moment(),
              expirationDate: expirationDate,
            });
            inputRef.current?.focus();
          }
        }
      : undefined;
  const handleCalendarClose = () => {
    if (inputData.name) {
      handleDataChange && handleDataChange(inputData);
      setExpirationDate(null);
      setInputData({
        name: '',
        quantity: '',
        registrationDate: moment(),
        expirationDate: expirationDate,
      });
      inputRef.current?.focus();
    }
  };
  useEffect(() => {
    if (submit) {
      hanldeEdit && hanldeEdit(inputData);
    }
  }, [type]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Group css={styles.box} position="apart" style={style}>
      {type === 'edit' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.1,
          }}
          style={{ width: 35, height: 35 }}
        >
          <IconDelete
            css={{
              width: 35,
              height: 35,
              '&>rect': {
                fill: DesignSystem.Color.warning.red,
              },
            }}
            onClick={() => {
              handleRemove && handleRemove();
            }}
          />
        </motion.div>
      )}

      <input
        type="text"
        value={inputData.name}
        onChange={(e) => {
          setInputData({ ...inputData, name: e.target.value });
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        css={styles.input.default}
        readOnly={type === 'list'}
        placeholder={type === 'list' ? undefined : '재료를 입력해주세요.'}
        {...composeProps}
      />
      <input
        type="text"
        value={inputData.quantity}
        onChange={(e) => {
          setInputData({ ...inputData, quantity: e.target.value });
        }}
        onKeyDown={handleKeyDown}
        css={styles.input.default}
        readOnly={type === 'list'}
        placeholder={type === 'list' ? undefined : '수량을 입력해주세요.'}
        {...composeProps}
      />
      <Typography variant="body" css={styles.input.default}>
        {inputData.registrationDate.format('YYYY/MM/DD')}
      </Typography>
      <CustomCalender
        inputDate={inputData.expirationDate}
        setInputDate={(date: Moment) => {
          setInputData({ ...inputData, expirationDate: date });
        }}
        type={type}
        placeholder="유통기한 날짜를 선택해주세요."
        handleClose={handleCalendarClose}
      >
        유통기한 설정
      </CustomCalender>
    </Group>
  );
}

export default IngrInputBox;

interface CustomCalenderProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  inputDate: Moment | null;
  setInputDate: (date: Moment) => void;
  handleClose: () => void;
  type: 'input' | 'edit' | 'list';
}

const CustomCalender = ({
  children,
  inputDate,
  setInputDate,
  handleClose,
  type,
  ...props
}: CustomCalenderProps) => {
  const [focus, setFocus] = useState(false);

  return type === 'list' ? (
    <Typography variant="body" css={styles.input.default}>
      {inputDate?.format('YYYY/MM/DD')}
    </Typography>
  ) : (
    <SingleDatePicker
      date={inputDate}
      onDateChange={(date) => {
        date && setInputDate(date);
      }}
      focused={focus}
      onFocusChange={({ focused }) => {
        setFocus(focused);
      }}
      noBorder={true}
      displayFormat="YYYY/MM/DD"
      monthFormat="YYYY M월"
      numberOfMonths={1}
      navPrev={<IconBack css={{ position: 'absolute', top: 20, left: 79 }} />}
      navNext={
        <IconBack
          css={{
            transform: 'rotate(180deg)',
            position: 'absolute',
            top: 20,
            right: 79,
          }}
        />
      }
      onClose={handleClose}
      renderCalendarInfo={() => {
        return (
          <div
            style={{
              background: `${
                inputDate
                  ? DesignSystem.Color.primary.yellow
                  : DesignSystem.Color.background.disabled
              }`,
              color: `${
                inputDate
                  ? DesignSystem.Color.text.black
                  : DesignSystem.Color.text.gray
              }`,
              cursor: `${inputDate ? 'pointer' : 'default'}`,
            }}
            css={styles.input.calender}
            onClick={
              inputDate
                ? () => {
                    setFocus(false);
                    handleClose();
                  }
                : undefined
            }
          >
            {children}
          </div>
        );
      }}
      hideKeyboardShortcutsPanel
      enableOutsideDays
      keepOpenOnDateSelect
      daySize={48}
      verticalSpacing={9}
      {...props}
      id={`${children}-${type}`}
    />
  );
};
