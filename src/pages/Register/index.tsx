import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransacionCardButton } from '../../components/Form/TransactionButton';
import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionTypes,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />

          <Input
            placeholder="Preço"
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
        </Fields>

        <Button title="Enviar" onPress={() => { }} />
      </Form>
    </Container>
  );
}
