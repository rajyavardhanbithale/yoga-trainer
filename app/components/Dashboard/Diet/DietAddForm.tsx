'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DietAddSelect } from './DietFormSelect'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { DietChange, saveRecentDiet } from '@/lib/store/dashboard/dietSlice'
import { IoIosAddCircleOutline } from 'react-icons/io'

export default function DietAddForm() {
    const foodData = useSelector((state: RootState) => state.dietSlice.FOOD)
    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState<string>('name')
    const [calories, setCalories] = useState<string>('0')
    const [protein, setProtein] = useState<string>('0')
    const [carbs, setCarbs] = useState<string>('0')
    const [fats, setFats] = useState<string>('0')

    const resetForm = () => {
        setName('name')
        setCalories('0')
        setProtein('0')
        setCarbs('0')
        setFats('0')
    }

    useEffect(() => {
        resetForm()
        setName(foodData ? foodData.name : 'name')
        setCalories(
            foodData?.nutritional_information?.calories.toString() ?? '0'
        )
        setProtein(
            foodData?.nutritional_information?.protein?.match(/\d+/)?.[0] ?? '0'
        )
        setCarbs(
            foodData?.nutritional_information?.carbohydrates?.match(
                /\d+/
            )?.[0] ?? '0'
        )
        setFats(
            foodData?.nutritional_information?.fats?.match(/\d+/)?.[0] ?? '0'
        )
    }, [foodData])

    const isNameDisabled = Boolean(foodData?.name)

    const handleSave = () => {
        const dietChange: DietChange = {
            id: Date.now(),
            name: name.trim(),
            calorie: parseFloat(calories) || 0,
            protein: parseFloat(protein) || 0,
            fat: parseFloat(fats) || 0,
            carb: parseFloat(carbs) || 0,
            method: 'save',
        }
        dispatch(saveRecentDiet(dietChange))
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="flex justify-center bg-slate-300 w-fit p-2 rounded-xl duration-700"
                        variant="outline"
                    >
                        <span className=" flex font-semibold gap-2 justify-center items-center">
                            <IoIosAddCircleOutline className="inline-flex mb-0.5 text-xl" />
                            Add Today&apos;s Diet
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mb-5">
                            Add Your Recent Diet
                        </DialogTitle>
                        <DialogDescription className="mt-5 text-sm text-gray-600 gap-5 flex items-center flex-col">
                            <span className="mr-2 text-center">
                                Add your recent diet data in the form below or
                                select a dish
                            </span>
                            <DietAddSelect />
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Food Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                disabled={isNameDisabled}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cal" className="text-right">
                                Calorie
                            </Label>
                            <Input
                                id="cal"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="protein" className="text-right">
                                Protein (in gm)
                            </Label>
                            <Input
                                id="protein"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="carbs" className="text-right">
                                Carbs (in gm)
                            </Label>
                            <Input
                                id="carbs"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fats" className="text-right">
                                Fats (in gm)
                            </Label>
                            <Input
                                id="fats"
                                value={fats}
                                onChange={(e) => setFats(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>
                            Save changes
                        </Button>

                        <Button
                            type="button"
                            onClick={resetForm}
                            variant="outline"
                        >
                            Reset
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
