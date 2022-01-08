import React, { useState, useEffect } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { TransacionCardButton } from '../../components/Form/TransactionButton';
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import CategorySelect from '../CategorySelect';
import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionTypes,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o nome da transação'),
  amount: Yup.number()
    .positive('Apenas valores positivos')
    .typeError('Informe um valor númerico')
    .required('Informe o valor da transação')
})

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister( form: FormData) {
    if (!transactionType) {
      return Alert.alert('Oops!', 'Selecione o tipo da transação.')
    }

    if (category.key === 'category') {
      return Alert.alert('Oops!', 'Selecione o tipo da categoria.')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);

      console.log(JSON.parse(data!));
    }

    loadData();
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              autoCorrect={false}
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransacionCardButton
              onPress={() => handleTransactionTypeSelect("up")}
                title="Income"
                type="up"
                isActive={transactionType === "up"}
              />

              <TransacionCardButton
              onPress={() => handleTransactionTypeSelect("down")}
                title="Down"
                type="down"
                isActive={transactionType === "down"}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal} />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
