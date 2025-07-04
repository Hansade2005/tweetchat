"use client"
import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"

type Flashcard = {
  id: number
  front: string
  back: string
}

const initialFlashcards: Flashcard[] = [
  {
    id: 1,
    front: "What is the scientific name for llamas?",
    back: "Lama glama"
  },
  {
    id: 2,
    front: "What continent are llamas native to?",
    back: "South America"
  },
  {
    id: 3,
    front: "What is a group of llamas called?",
    back: "A herd"
  },
  {
    id: 4,
    front: "How long is the gestation period for llamas?",
    back: "About 11 months"
  },
  {
    id: 5,
    front: "What are llamas primarily used for in their native range?",
    back: "Pack animals and wool production"
  }
]

export default function LlamaFlashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [frontText, setFrontText] = useState('')
  const [backText, setBackText] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const currentFlashcard = flashcards[currentIndex]

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleNext = () => {
    setIsRevealed(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
  }

  const handlePrevious = () => {
    setIsRevealed(false)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    )
  }

  const handleCorrectGuess = () => {
    setCorrectGuesses(correctGuesses + 1)
    handleNext()
  }

  const handleAddFlashcard = (e: React.FormEvent) => {
    e.preventDefault()
    if (frontText.trim() && backText.trim()) {
      const newFlashcard: Flashcard = {
        id: flashcards.length + 1,
        front: frontText,
        back: backText
      }
      setFlashcards([...flashcards, newFlashcard])
      setFrontText('')
      setBackText('')
      setIsAdding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Llama Flashcards</h1>
        
        {/* Progress Tracking */}
        <div className="mb-6 text-center">
          <p className="text-lg font-medium">
            Progress: {correctGuesses} correct {correctGuesses === 1 ? 'guess' : 'guesses'}
          </p>
          <p className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
        </div>

        {/* Flashcard Display */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Flashcard</CardTitle>
          </CardHeader>
          <CardContent className="min-h-40 flex flex-col items-center justify-center">
            {!isRevealed ? (
              <p className="text-2xl font-medium text-center">{currentFlashcard.front}</p>
            ) : (
              <p className="text-2xl font-medium text-center text-primary">{currentFlashcard.back}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            {!isRevealed ? (
              <Button onClick={handleReveal}>Reveal Answer</Button>
            ) : (
              <div className="flex gap-4">
                <Button variant="outline" onClick={handlePrevious}>Previous</Button>
                <Button variant="destructive" onClick={handleNext}>I Was Wrong</Button>
                <Button onClick={handleCorrectGuess}>I Was Right</Button>
              </div>
            )}
          </CardFooter>
        </Card>

        {/* Add Flashcard Section */}
        <div className="mb-8">
          {!isAdding ? (
            <Button className="w-full" onClick={() => setIsAdding(true)}>
              Add New Flashcard
            </Button>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Add New Flashcard</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFlashcard}>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="front">Question</Label>
                      <Input
                        id="front"
                        value={frontText}
                        onChange={(e) => setFrontText(e.target.value)}
                        placeholder="Enter the question"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="back">Answer</Label>
                      <Input
                        id="back"
                        value={backText}
                        onChange={(e) => setBackText(e.target.value)}
                        placeholder="Enter the answer"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Save Flashcard</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAdding(false)
                          setFrontText('')
                          setBackText('')
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Flashcard List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Flashcards ({flashcards.length})</h2>
          <div className="grid gap-2">
            {flashcards.map((flashcard, index) => (
              <div
                key={flashcard.id}
                className={`p-3 rounded border ${index === currentIndex ? 'bg-primary/10 border-primary' : 'bg-background'}`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsRevealed(false)
                }}
              >
                <p className="font-medium">{flashcard.front}</p>
                <p className="text-sm text-muted-foreground truncate">{flashcard.back}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
