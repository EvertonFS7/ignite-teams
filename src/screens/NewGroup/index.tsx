import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView } from 'react-native';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
    const { navigate } = useNavigation()
    const [group, setGroup] = useState('')

    async function handleNew() {
        try {
            if (group.trim().length === 0) {
                return Alert.alert('Novo Grupo', 'Informe o nome da turma')
            }
            await groupCreate(group)
            navigate('players', {
                group
            })
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
            }
        }
    }

    return (
        <Container>
                <Header showBackButton />
                <Content behavior='padding' enabled>
                    <Icon />
                    <Highlight title='Nova Turma' subtitle='crie a turma para adicionar as pessoas' />
                    <Input
                        placeholder='Nome da turma'
                        onChangeText={setGroup}
                    />
                    <Button title='Criar' onPress={handleNew} />
                </Content>
        </Container>

    );
}