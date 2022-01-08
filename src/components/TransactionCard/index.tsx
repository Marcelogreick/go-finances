import React from "react";
import { categories } from "../../utils/categories";
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from "./styles";

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: "up" | "down";
}
interface ITransactionCardProps {
  data: TransactionCardProps;
}
export function TransactionCard({data}: ITransactionCardProps) {
  const category = categories.filter(item => item.key === data.category)[0];

  console.log(data.type, 'oi')
  return (
    <Container>
     <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "down" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
