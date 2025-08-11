import { use } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ExerciseByIdResponse } from '@/types/excercisedb-api';


const formatInstruction = (instruction: string) => {
    const parts = instruction.match(/^Step:(\d+)(.*)$/);
    return {
        step: parts ? `${parts[1]}:` : '',
        description: parts ? parts[2] : instruction
    };
};

export default function ExerciseCard({ fetchPromise }: { fetchPromise: Promise<ExerciseByIdResponse> }) {
    const data = use(fetchPromise);
    return (
        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 uppercase text-center">{data.data.name}</h2>
            <div className="min-w-full flex flex-col items-center">
                <Image src={data.data.gifUrl} alt={data.data.name} width={200} height={200} />
                <Accordion type="single" collapsible className="min-w-full">
                    <AccordionItem value="item-1" >
                        <AccordionTrigger >Instructions</AccordionTrigger>
                        <AccordionContent className="flex flex-col space-y-1 text-sm text-gray-600">
                            {data.data.instructions.map((instruction, index) => {
                                const { step, description } = formatInstruction(instruction);
                                return (
                                    <p key={index}>
                                        <span className="font-bold">{step}</span>
                                        {description}
                                    </p>
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </Card>
    );
}