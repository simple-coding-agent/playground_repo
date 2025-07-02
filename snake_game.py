import pygame
import random
import sys

# Initialize pygame
pygame.init()

# Game constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
GRID_SIZE = 20
GRID_WIDTH = WINDOW_WIDTH // GRID_SIZE
GRID_HEIGHT = WINDOW_HEIGHT // GRID_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
DARK_GREEN = (0, 128, 0)

# Directions
UP = (0, -1)
DOWN = (0, 1)
LEFT = (-1, 0)
RIGHT = (1, 0)

class Snake:
    def __init__(self):
        self.body = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
        self.direction = RIGHT
        self.grow_next = False
    
    def move(self):
        head = self.body[0]
        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])
        self.body.insert(0, new_head)
        
        if not self.grow_next:
            self.body.pop()
        else:
            self.grow_next = False
    
    def grow(self):
        self.grow_next = True
    
    def change_direction(self, new_direction):
        # Prevent the snake from going back into itself
        if (new_direction[0] * -1, new_direction[1] * -1) != self.direction:
            self.direction = new_direction
    
    def check_collision(self):
        head = self.body[0]
        
        # Check wall collision
        if (head[0] < 0 or head[0] >= GRID_WIDTH or 
            head[1] < 0 or head[1] >= GRID_HEIGHT):
            return True
        
        # Check self collision
        if head in self.body[1:]:
            return True
        
        return False
    
    def draw(self, screen):
        for i, segment in enumerate(self.body):
            color = DARK_GREEN if i == 0 else GREEN  # Head is darker
            rect = pygame.Rect(segment[0] * GRID_SIZE, segment[1] * GRID_SIZE, 
                             GRID_SIZE, GRID_SIZE)
            pygame.draw.rect(screen, color, rect)
            pygame.draw.rect(screen, BLACK, rect, 1)

class Food:
    def __init__(self):
        self.position = self.generate_position()
    
    def generate_position(self):
        return (random.randint(0, GRID_WIDTH - 1), 
                random.randint(0, GRID_HEIGHT - 1))
    
    def respawn(self, snake_body):
        while True:
            self.position = self.generate_position()
            if self.position not in snake_body:
                break
    
    def draw(self, screen):
        rect = pygame.Rect(self.position[0] * GRID_SIZE, self.position[1] * GRID_SIZE,
                          GRID_SIZE, GRID_SIZE)
        pygame.draw.rect(screen, RED, rect)
        pygame.draw.rect(screen, BLACK, rect, 1)

class SnakeGame:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("Snake Game")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.reset_game()
    
    def reset_game(self):
        self.snake = Snake()
        self.food = Food()
        self.score = 0
        self.game_over = False
        self.paused = False
    
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            
            elif event.type == pygame.KEYDOWN:
                if self.game_over:
                    if event.key == pygame.K_r:
                        self.reset_game()
                    elif event.key == pygame.K_q:
                        return False
                else:
                    if event.key == pygame.K_UP:
                        self.snake.change_direction(UP)
                    elif event.key == pygame.K_DOWN:
                        self.snake.change_direction(DOWN)
                    elif event.key == pygame.K_LEFT:
                        self.snake.change_direction(LEFT)
                    elif event.key == pygame.K_RIGHT:
                        self.snake.change_direction(RIGHT)
                    elif event.key == pygame.K_SPACE:
                        self.paused = not self.paused
        return True
    
    def update(self):
        if not self.game_over and not self.paused:
            self.snake.move()
            
            # Check if snake ate food
            if self.snake.body[0] == self.food.position:
                self.snake.grow()
                self.score += 10
                self.food.respawn(self.snake.body)
            
            # Check for collision
            if self.snake.check_collision():
                self.game_over = True
    
    def draw(self):
        self.screen.fill(BLACK)
        
        if not self.game_over:
            self.snake.draw(self.screen)
            self.food.draw(self.screen)
        
        # Draw score
        score_text = self.font.render(f"Score: {self.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        
        # Draw game over screen
        if self.game_over:
            game_over_text = self.font.render("GAME OVER", True, WHITE)
            restart_text = self.font.render("Press R to restart or Q to quit", True, WHITE)
            
            game_over_rect = game_over_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 - 50))
            restart_rect = restart_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 10))
            
            self.screen.blit(game_over_text, game_over_rect)
            self.screen.blit(restart_text, restart_rect)
        
        # Draw pause screen
        if self.paused and not self.game_over:
            pause_text = self.font.render("PAUSED - Press SPACE to continue", True, WHITE)
            pause_rect = pause_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2))
            self.screen.blit(pause_text, pause_rect)
        
        # Draw instructions
        if not self.game_over and not self.paused:
            instructions = self.font.render("Use arrow keys to move, SPACE to pause", True, WHITE)
            self.screen.blit(instructions, (10, WINDOW_HEIGHT - 30))
        
        pygame.display.flip()
    
    def run(self):
        running = True
        while running:
            running = self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(10)  # 10 FPS for Snake game speed
        
        pygame.quit()
        sys.exit()

# Run the game
if __name__ == "__main__":
    print("Welcome to Snake Game!")
    print("Controls:")
    print("- Use arrow keys to move the snake")
    print("- Press SPACE to pause/unpause")
    print("- Press R to restart when game over")
    print("- Press Q to quit when game over")
    print("- Close the window to exit")
    print("\nStarting game...")
    
    game = SnakeGame()
    game.run()