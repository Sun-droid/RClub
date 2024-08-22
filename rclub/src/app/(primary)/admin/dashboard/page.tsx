import {promises as fs} from 'fs';
import Card from '@/app/components/card'

export default async function Page() {
    const file = await fs.readFile(process.cwd() + '/src/app/(primary)/events/srcFiles/DefaultCard.json', 'utf8');
    const data = JSON.parse(file)
    const dataProp = data.array_elem[0]
    return (
        <div>
            <Card dataProp={dataProp} reserveButton={true} renderAdminColumn={false} session={null}/>
        </div>
    );
}