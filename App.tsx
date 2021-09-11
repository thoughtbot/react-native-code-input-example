import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';

const CODE_LENGTH = 4;

const CodeInput = () => {
  const [code, setCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const codeDigitsArray = [...Array(CODE_LENGTH)];

  const ref = useRef<TextInput>(null);

  const setCodeInput = (input: string) => {
    if (input.length === 0) setCode(input);
    const last = input[input.length - 1];
    if (last?.trim() === '') return; // ignore space, (+' ') == 0
    // make sure the input is numeric before updating
    if (+last >= 0 && +last <= 9) setCode(input);
   };

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle = [
      style.code_input_inputContainer,
      isFocused && containerIsFocused && style.code_input_inputContainerFocused,
    ];

    return (
      <View key={idx} style={containerStyle}>
        <Text style={style.inputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Pressable style={style.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCodeInput}
        onSubmitEditing={handleOnBlur}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={style.hiddenCodeInput}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderColor: '#cccccc',
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputContainerFocused: {
    borderColor: '#0f5181',
  },
  inputText: {
    fontSize: 24,
    fontFamily: 'Menlo-Regular',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});

export default CodeInput;
