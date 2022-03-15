namespace SpriteKind {
    export const Object = SpriteKind.create()
    export const NewScreen = SpriteKind.create()
    export const dot = SpriteKind.create()
    export const Arrow1 = SpriteKind.create()
    export const Arrow2 = SpriteKind.create()
    export const chest1 = SpriteKind.create()
    export const Arrow3 = SpriteKind.create()
    export const Arrow4 = SpriteKind.create()
    export const chest2 = SpriteKind.create()
    export const dot2 = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const Enemy2 = SpriteKind.create()
    export const E3 = SpriteKind.create()
    export const Eprojectile = SpriteKind.create()
    export const End = SpriteKind.create()
    export const EvilWizard = SpriteKind.create()
    export const Shield = SpriteKind.create()
    export const WizProj = SpriteKind.create()
    export const Shark = SpriteKind.create()
    export const MegaBoss = SpriteKind.create()
    export const ZPro = SpriteKind.create()
    export const None = SpriteKind.create()
}
namespace StatusBarKind {
    export const Boss1Health = StatusBarKind.create()
    export const Jumping = StatusBarKind.create()
    export const WizShield = StatusBarKind.create()
    export const WizHelth = StatusBarKind.create()
    export const skhlth = StatusBarKind.create()
    export const ZBossHealth = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow3, function (sprite, otherSprite) {
    pause2()
    chest.destroy(effects.spray, 500)
    controller.moveSprite(hero, 0, 0)
    tiles.setCurrentTilemap(tilemap`area3`)
    hero.setStayInScreen(false)
    hero.setPosition(60, 120)
    Right.destroy()
    Left.destroy()
    scene.setBackgroundImage(assets.image`bg`)
    chest = sprites.create(assets.image`z`, SpriteKind.chest2)
    chest.setPosition(247, 217)
    portal = sprites.create(assets.image`portL`, SpriteKind.Portal)
    portal.setPosition(220, 120)
    pause(200)
    block = sprites.create(assets.image`dot`, SpriteKind.dot2)
    block.setPosition(60, 120)
    scene.cameraFollowSprite(block)
    block.follow(portal)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.WizProj, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.WizProj, effects.disintegrate, 1)
    effects.blizzard.endScreenEffect()
    game.splash("You lost a life!!!")
    info.changeLifeBy(-1)
})
controller.combos.attachCombo("UUUDUBBB", function () {
    animation.runImageAnimation(
    hero,
    assets.animation`Sword Hit`,
    130,
    false
    )
    music.sonar.play()
    if (statusbar.value > 0) {
        statusbar.value += -20
        projectile = sprites.createProjectileFromSprite(assets.image`f2`, hero, 0, -70)
    }
    if (statusbar.value == 0) {
        timer.after(2000, function () {
            statusbar.value += 100
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile19`, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(94, 6), sprites.swamp.swampTile9)
    tiles.setTileAt(tiles.getTileLocation(127, 5), sprites.swamp.swampTile9)
    info.changeLifeBy(1)
    game.splash("+1 life!")
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (Heroskin[0] == 0) {
        game.splash("Stay in bounds")
    } else if (Heroskin[0] == 1) {
        timer.after(200, function () {
            statusbar2.value = 100
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow2, function (sprite, otherSprite) {
    Left.destroy()
    chest.destroy()
    Right.destroy()
    pause2()
    chest.destroy()
    Right = sprites.create(assets.image`1`, SpriteKind.Arrow1)
    Right.setPosition(230, 60)
    hero.setPosition(210, 60)
    tiles.setCurrentTilemap(tilemap`area1`)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Heroskin[0] == 0) {
        animation.runImageAnimation(
        hero,
        assets.animation`Sword Hit`,
        130,
        false
        )
        music.sonar.play()
        if (statusbar.value > 0) {
            statusbar.value += -20
            projectile = sprites.createProjectileFromSprite(assets.image`f`, hero, 70, 0)
        }
        if (statusbar.value == 0) {
            timer.after(2000, function () {
                statusbar.value += 100
            })
        }
    } else if (Heroskin[0] == 10) {
        animation.runImageAnimation(
        hero,
        assets.animation`Sword Hit`,
        130,
        false
        )
        music.sonar.play()
        if (statusbar.value > 0) {
            statusbar.value += -20
            projectile = sprites.createProjectileFromSprite(assets.image`f`, hero, 70, 0)
        }
        if (statusbar.value == 0) {
            timer.after(2000, function () {
                statusbar.value += 100
            })
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shark, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    Shk.destroy(effects.blizzard, 500)
    game.splash("Shark got you, restart.")
    tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
    info.startCountdown(5)
})
function Minigamewizard () {
    scene.setBackgroundImage(assets.image`etgdr`)
    scroller.scrollBackgroundWithSpeed(0, 0)
    tiles.setCurrentTilemap(tilemap`Wizard Blank`)
    EvWiard = sprites.create(assets.image`EvilWizrd`, SpriteKind.EvilWizard)
    EvWiard.setStayInScreen(false)
    tiles.placeOnRandomTile(EvWiard, assets.tile`myTile16`)
    WizHelth = statusbars.create(20, 4, StatusBarKind.WizHelth)
    WizHelth.attachToSprite(EvWiard, -25, -5)
    WizHelth.max = 100
    WizHelth.value = 100
    WizHelth.setLabel("HP")
    WizHelth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    WizShieldsetup()
    effects.blizzard.startScreenEffect()
    game.showLongText("A monster is here! Find it and slay it!", DialogLayout.Bottom)
    game.showLongText("Dodge enemy projectiles!", DialogLayout.Bottom)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ZPro, function (sprite, otherSprite) {
    game.splash("Oof,", "-1 life.")
    info.changeLifeBy(-1)
    sprites.destroyAllSpritesOfKind(SpriteKind.ZPro)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile24`, function (sprite, location) {
    game.splash("+1 life!")
    info.changeLifeBy(1)
    tiles.setTileAt(tiles.getTileLocation(2, 2), sprites.dungeon.chestOpen)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile32`, function (sprite, location) {
    game.showLongText("Huh, the sign says that the real boss stage is somewhere else?", DialogLayout.Bottom)
    game.showLongText("It's in the bottom left corner of the pocket dimension area!", DialogLayout.Bottom)
    tiles.setTileAt(tiles.getTileLocation(13, 7), assets.tile`transparency16`)
    tiles.setTileAt(tiles.getTileLocation(13, 8), assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    game.showLongText("There are locks. Find the keys inside the mini-portals to open the boss level.", DialogLayout.Bottom)
    LOng_COde()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Heroskin[0] == 1) {
        if (statusbar2.value > 0) {
            statusbar2.value = 0
            hero.vy = -200
        }
    } else if (Heroskin[0] == 2) {
        Hero2Projectile = sprites.createProjectileFromSprite(assets.image`f`, hero, 300, 0)
    }
})
sprites.onOverlap(SpriteKind.MegaBoss, SpriteKind.dot, function (sprite, otherSprite) {
    ZBossLevel = [1]
    block.destroy()
    scene.cameraShake(4, 500)
    controller.moveSprite(hero)
    game.splash("Boss Battle Begin")
    ZPosition = [1]
    ZBossHP = statusbars.create(100, 4, StatusBarKind.ZBossHealth)
    ZBossHP.positionDirection(CollisionDirection.Top)
    ZBossHP.max = 200
    ZBossHP.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    ZBossHP.setColor(7, 2, 3)
    ZBossHP.value += 200
    info.player2.setLife(3)
})
statusbars.onZero(StatusBarKind.Boss1Health, function (status) {
    pause(1000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 500)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy2, effects.fire, 500)
    sprites.destroyAllSpritesOfKind(SpriteKind.E3, effects.fire, 500)
    scene.cameraFollowSprite(Villian)
    Villian.startEffect(effects.fire, 1000)
    Villian.destroy(effects.fire, 1000)
    game.splash("You've defeated the monster. Congrats!!!")
    game.splash("!!Touch the checkpoint block to save data!!")
    tiles.setTileAt(tiles.getTileLocation(12, 7), assets.tile`check1`)
    effects.confetti.startScreenEffect(2000)
    scene.cameraFollowSprite(hero)
    portal = sprites.create(assets.image`portL`, SpriteKind.Portal)
    portal.setPosition(220, 120)
    Keys = []
})
function theme_song () {
    music.playMelody("F A C5 F A C5 F A ", 500)
    music.playMelody("C5 F A C5 E G B E ", 500)
    music.playMelody("G B E G B E G B ", 500)
    music.playMelody("D F A D F A D F ", 500)
    music.playMelody("A D F A C - C - ", 500)
    music.playMelody("- C E C D C C C ", 500)
    music.playMelody("F A C5 F A C5 F A ", 500)
    music.playMelody("C5 F A C5 E G B E ", 500)
    music.playMelody("G B E G B E G B ", 500)
    music.playMelody("D F A D F A D F ", 500)
    music.playMelody("A D F A C - C - ", 500)
    music.playMelody("- C E C D C C G ", 500)
    music.playMelody("A - - G - - F - ", 500)
    music.playMelody("- F - - E - - D ", 500)
    music.playMelody("- C G - - - A - ", 500)
    music.playMelody("G - - F - - E - ", 500)
    music.playMelody("D G - E - D E C ", 500)
    music.playMelody("- - - - - - - - ", 1000)
    music.playMelody("- - - - - - - - ", 1000)
}
function Checkpoint1 () {
    info.setLife(3)
    New_Player()
    hero.setPosition(120, 120)
    tiles.setCurrentTilemap(tilemap`area3`)
    scene.setBackgroundImage(assets.image`bg`)
    portal = sprites.create(assets.image`portL`, SpriteKind.Portal)
    portal.setPosition(220, 120)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    chest.destroy()
    portal.destroy()
    level2()
    timer.after(1000, function () {
        game.showLongText("This seems to be a pocket dimension.", DialogLayout.Bottom)
        game.splash("Look around.")
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.spray, 1)
    Boss1_HP.value += -30
})
function New_Player () {
    hero = sprites.create(assets.image`Dude`, SpriteKind.Player)
    controller.moveSprite(hero)
    animation.runImageAnimation(
    hero,
    assets.animation`Walking`,
    200,
    true
    )
    scene.cameraFollowSprite(hero)
    statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(hero)
    statusbar.setColor(7, 2, 4)
    statusbar.setLabel("PWR")
    statusbar.max = 101
}
controller.combos.attachCombo("UUUDUBBBB", function () {
    animation.runImageAnimation(
    hero,
    assets.animation`Sword Hit`,
    130,
    false
    )
    music.sonar.play()
    if (statusbar.value > 0) {
        statusbar.value += -20
        projectile = sprites.createProjectileFromSprite(assets.image`f0`, hero, 0, 70)
    }
    if (statusbar.value == 0) {
        timer.after(2000, function () {
            statusbar.value += 100
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dot, function (sprite, otherSprite) {
    music.pewPew.play()
    animation.stopAnimation(animation.AnimationTypes.All, hero)
    block.destroy()
    hero.setVelocity(0, 0)
    scene.cameraShake(3, 500)
    game.splash("Ouch!")
    hero.setStayInScreen(true)
    controller.moveSprite(hero, 100, 100)
    animation.runImageAnimation(
    hero,
    assets.animation`Walking`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    game.splash("Minus 2 lives. Sucks for you.")
    info.changeLifeBy(-2)
    tiles.setTileAt(tiles.getTileLocation(7, 2), sprites.dungeon.chestOpen)
})
function Unlock () {
    game.splash("Check out the locks.")
    if (Keys.length == 1) {
        tiles.setTileAt(tiles.getTileLocation(45, 6), assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(46, 6), false)
        hero.setStayInScreen(true)
        scene.cameraFollowSprite(hero)
        controller.moveSprite(hero, 100, 100)
    } else if (Keys.length == 2) {
        tiles.setTileAt(tiles.getTileLocation(45, 6), assets.tile`transparency16`)
        tiles.setTileAt(tiles.getTileLocation(45, 7), assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(46, 6), false)
        tiles.setWallAt(tiles.getTileLocation(46, 7), false)
        hero.setStayInScreen(true)
        scene.cameraFollowSprite(hero)
        controller.moveSprite(hero, 100, 100)
    } else if (Keys.length == 3) {
        tiles.setTileAt(tiles.getTileLocation(45, 6), assets.tile`transparency16`)
        tiles.setTileAt(tiles.getTileLocation(45, 7), assets.tile`transparency16`)
        tiles.setTileAt(tiles.getTileLocation(45, 8), assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(46, 8), false)
        tiles.setWallAt(tiles.getTileLocation(46, 6), false)
        tiles.setWallAt(tiles.getTileLocation(46, 7), false)
        hero.setStayInScreen(true)
        scene.cameraFollowSprite(hero)
        controller.moveSprite(hero, 100, 100)
    } else if (Keys.length >= 4) {
        tiles.setTileAt(tiles.getTileLocation(45, 6), assets.tile`transparency16`)
        tiles.setTileAt(tiles.getTileLocation(45, 7), assets.tile`transparency16`)
        tiles.setTileAt(tiles.getTileLocation(45, 8), assets.tile`transparency16`)
        tiles.setTileAt(tiles.getTileLocation(45, 9), assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(46, 6), false)
        tiles.setWallAt(tiles.getTileLocation(46, 7), false)
        tiles.setWallAt(tiles.getTileLocation(46, 8), false)
        tiles.setWallAt(tiles.getTileLocation(46, 9), false)
        hero.setStayInScreen(true)
        scene.cameraFollowSprite(hero)
        controller.moveSprite(hero, 100, 100)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EvilWizard, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.disintegrate, 1)
    WizHelth.value += -10
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 100)
    projectile.destroy()
})
function pause2 () {
    color.FadeToBlack.startScreenEffect(500)
    pause(500)
    color.startFade(color.Black, color.originalPalette)
}
sprites.onDestroyed(SpriteKind.E3, function (sprite) {
    if (Boss1_HP.value > 0) {
        timer.after(1000, function () {
            En3 = sprites.create(assets.image`enemie`, SpriteKind.Enemy)
            En3.setPosition(300, 50)
            En3.follow(hero)
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.chest2, function (sprite, otherSprite) {
    music.jumpUp.play()
    chest.destroy()
    game.showLongText("You got 1 extra life!", DialogLayout.Bottom)
    info.changeLifeBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile18`, function (sprite, location) {
    ShkHp.value += -10
    hero.setVelocity(0, 0)
    game.splash("You are in safe zone now!")
    Shk.destroy(effects.blizzard, 500)
    controller.moveSprite(hero)
    tiles.placeOnRandomTile(hero, sprites.swamp.swampTile7)
})
info.onCountdownEnd(function () {
    if (Heroskin[0] == 2) {
        WizShieldsetup()
    } else if (Heroskin[0] == 3) {
        game.splash("Shark has spawned!")
        Shk = sprites.create(assets.image`sharkAttack5`, SpriteKind.Shark)
        animation.runImageAnimation(
        Shk,
        assets.animation`hungy`,
        150,
        true
        )
        Shk.follow(hero, 100)
        tiles.placeOnRandomTile(Shk, assets.tile`myTile2`)
    } else if (Heroskin[0] == 5) {
        game.splash("Time's up, -1 life!")
        info.changeLifeBy(-1)
        info.startCountdown(15)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.chest1, function (sprite, otherSprite) {
    Heroskin = [0]
    music.beamUp.play()
    chest.destroy()
    game.showLongText("You have acquired a flame sword! Press B to shoot.", DialogLayout.Bottom)
    game.showLongText("Once your energy is at 0, it will take time to replenish.", DialogLayout.Bottom)
    statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(hero)
    statusbar.setColor(7, 2, 4)
    statusbar.setLabel("PWR")
    statusbar.max = 101
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile29`, function (sprite, location) {
    game.splash("+1 life!")
    info.changeLifeBy(1)
    tiles.setTileAt(tiles.getTileLocation(12, 12), sprites.dungeon.chestOpen)
})
function level2 () {
    if (Keys.length >= 1) {
        LOng_COde()
    }
    tiles.placeOnRandomTile(hero, assets.tile`myTile15`)
    tiles.setCurrentTilemap(tilemap`menu`)
    scene.setBackgroundImage(assets.image`myImage`)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    if (Keys.length == 4) {
        game.splash("You have all 4 keys!")
        game.splash("Enter Boss Level!!!")
    }
}
function LOng_COde () {
    tiles.setTileAt(tiles.getTileLocation(42, 6), assets.tile`transparency16`)
    tiles.setTileAt(tiles.getTileLocation(42, 7), assets.tile`transparency16`)
    tiles.setTileAt(tiles.getTileLocation(42, 8), assets.tile`transparency16`)
    tiles.setTileAt(tiles.getTileLocation(42, 9), assets.tile`transparency16`)
    tiles.setWallAt(tiles.getTileLocation(34, 5), false)
    tiles.setWallAt(tiles.getTileLocation(35, 5), false)
    tiles.setWallAt(tiles.getTileLocation(36, 5), false)
    tiles.setWallAt(tiles.getTileLocation(37, 5), false)
    tiles.setWallAt(tiles.getTileLocation(38, 5), false)
    tiles.setWallAt(tiles.getTileLocation(34, 10), false)
    tiles.setWallAt(tiles.getTileLocation(35, 10), false)
    tiles.setWallAt(tiles.getTileLocation(36, 10), false)
    tiles.setWallAt(tiles.getTileLocation(37, 10), false)
    tiles.setWallAt(tiles.getTileLocation(38, 10), false)
    tiles.setWallAt(tiles.getTileLocation(26, 5), false)
    tiles.setWallAt(tiles.getTileLocation(27, 5), false)
    tiles.setWallAt(tiles.getTileLocation(28, 5), false)
    tiles.setWallAt(tiles.getTileLocation(29, 5), false)
    tiles.setWallAt(tiles.getTileLocation(30, 5), false)
    tiles.setWallAt(tiles.getTileLocation(26, 10), false)
    tiles.setWallAt(tiles.getTileLocation(27, 10), false)
    tiles.setWallAt(tiles.getTileLocation(28, 10), false)
    tiles.setWallAt(tiles.getTileLocation(29, 10), false)
    tiles.setWallAt(tiles.getTileLocation(30, 10), false)
    tiles.setWallAt(tiles.getTileLocation(18, 5), false)
    tiles.setWallAt(tiles.getTileLocation(19, 5), false)
    tiles.setWallAt(tiles.getTileLocation(20, 5), false)
    tiles.setWallAt(tiles.getTileLocation(21, 5), false)
    tiles.setWallAt(tiles.getTileLocation(22, 5), false)
    tiles.setWallAt(tiles.getTileLocation(18, 10), false)
    tiles.setWallAt(tiles.getTileLocation(19, 10), false)
    tiles.setWallAt(tiles.getTileLocation(20, 10), false)
    tiles.setWallAt(tiles.getTileLocation(21, 10), false)
    tiles.setWallAt(tiles.getTileLocation(22, 10), false)
}
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile13, function (sprite, location) {
    hero.vx += 40
    tiles.setTileAt(hero.tilemapLocation(), sprites.swamp.swampTile9)
})
sprites.onDestroyed(SpriteKind.Enemy2, function (sprite) {
    if (Boss1_HP.value > 0) {
        timer.after(1000, function () {
            E2 = sprites.create(assets.image`enemie`, SpriteKind.Enemy)
            E2.setPosition(300, 100)
            E2.follow(hero)
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`menu`)
    scene.setBackgroundImage(assets.image`myImage`)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    tiles.setWallAt(tiles.getTileLocation(0, 14), false)
    tiles.setWallAt(tiles.getTileLocation(1, 14), false)
    tiles.setWallAt(tiles.getTileLocation(1, 15), false)
    tiles.placeOnRandomTile(hero, assets.tile`myTile15`)
    game.showLongText("The boss should be in the bottom left corner.", DialogLayout.Bottom)
})
statusbars.onZero(StatusBarKind.ZBossHealth, function (status) {
    if (ZBossLevel[0] == 3) {
        game.splash("Boss Defeated")
        game.splash("You beat the game!", "I tried making it impossible!")
        info.player2.changeLifeBy(-1)
        ZPosition = [0]
        sprites.destroyAllSpritesOfKind(SpriteKind.ZPro)
        ZBoss.destroy()
        hero.destroy()
        picture = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.None)
        animation.runImageAnimation(
        picture,
        [img`
            ..............................
            ............eeeeeeeeeee.......
            ...........eeeeeeeeeee........
            ..........eeeeeeeeee..........
            ..........eef1fdf1fd..........
            ..........dfff1fff1dd.........
            ..........ddfffdfffdd.........
            ..........ddddddddddd.........
            ..........dddfddddddd.........
            .....ddd...dddfffddd...ddd....
            .....ddbb...ddddddd...bbdd....
            .....dbaaa..bbaaabb..aaabd....
            ......baaaa.abbbbba.aaaab.....
            .......aaaaaaaaaaaaaaaaa......
            ........aaaaaaaaaaaaaaa.......
            .........aaaaaaaaaaaaa........
            ............aaaaaaa...........
            ............aaaaaaa...........
            ............8888888...........
            ............8888888...........
            ............888.888...........
            ............888.888...........
            ............888.888...........
            ............888.888...........
            ...........ffff.ffff..........
            ...........ffff.ffff..........
            ..............................
            ..............................
            ..............................
            ..............................
            `,img`
            ..............................
            ..............................
            ............eeeeeeeeeee.......
            ...........eeeeeeeeeee........
            ..........eeeeeeeeee..........
            ..........eef1fdf1fd..........
            ..........dfff1fff1dd.........
            ..........ddfffdfffdd.........
            ..........ddddddddddd.........
            ..........dddfddddddd.........
            ...........dddfffddd..........
            .......ddd..ddddddd..ddd......
            .......bbb..bbaaabb..bbb......
            .......aaa..abbbbba..aaa......
            .......aaaaaaaaaaaaaaaaa......
            .......aaaaaaaaaaaaaaaaa......
            ........aaaaaaaaaaaaaaa.......
            ............aaaaaaa...........
            ...........aaaaaaa............
            ...........8888888............
            ..........8888.888............
            .........8888..888............
            ........8888...888............
            ........888....888............
            .......ffff....ffff...........
            .......ffff....ffff...........
            ..............................
            ..............................
            ..............................
            ..............................
            `,img`
            ..............................
            ............eeeeeeeeeee.......
            ...........eeeeeeeeeee........
            ..........eeeeeeeeee..........
            ..........eef1fdf1fd..........
            ..........dfff1fff1dd.........
            ..........ddfffdfffdd.........
            ..........ddddddddddd.........
            ..........dddfddddddd.........
            .....ddd...dddfffddd...ddd....
            .....ddbb...ddddddd...bbdd....
            .....dbaaa..bbaaabb..aaabd....
            ......baaaa.abbbbba.aaaab.....
            .......aaaaaaaaaaaaaaaaa......
            ........aaaaaaaaaaaaaaa.......
            .........aaaaaaaaaaaaa........
            ............aaaaaaa...........
            ............aaaaaaa...........
            ............8888888...........
            ............8888888...........
            ............888.888...........
            ............888.888...........
            ............888.888...........
            ............888.888...........
            ...........ffff.ffff..........
            ...........ffff.ffff..........
            ..............................
            ..............................
            ..............................
            ..............................
            `,img`
            ..............................
            ..............................
            ...........eeeeeeeeeee........
            ..........eeeeeeeeeee.........
            .........eeeeeeeeee...........
            .........eef1fdf1fd...........
            .........dfff1fff1dd..........
            .........ddfffdfffdd..........
            .........ddddddddddd..........
            .........dddfddddddd..........
            ..........dddfffddd...........
            ......ddd..ddddddd..ddd.......
            ......bbb..bbaaabb..bbb.......
            ......aaa..abbbbba..aaa.......
            ......aaaaaaaaaaaaaaaaa.......
            ......aaaaaaaaaaaaaaaaa.......
            .......aaaaaaaaaaaaaaa........
            ...........aaaaaaa............
            ............aaaaaaa...........
            ............8888888...........
            ............888.8888..........
            ............888..8888.........
            ............888...8888........
            ............888....888........
            ...........ffff....ffff.......
            ...........ffff....ffff.......
            ..............................
            ..............................
            ..............................
            ..............................
            `],
        200,
        true
        )
        picture.setPosition(76, 55)
        scene.cameraFollowSprite(picture)
        Game_over()
    } else if (ZBossLevel[0] == 2) {
        game.splash("Boss Difficulty", "Increased! Again")
        game.splash("Here are 3 extra lives.", "You'll need them.")
        info.player2.changeLifeBy(-1)
        info.changeLifeBy(3)
        ZBossHP.value += 200
        ZBossLevel = [3]
    } else if (ZBossLevel[0] == 1) {
        game.splash("Boss Difficulty", "Increased! ")
        game.splash("You gained", "1 life!")
        info.changeLifeBy(1)
        info.player2.changeLifeBy(-1)
        ZBossLevel = [2]
        ZBossHP.value += 200
        ZPosition = [1]
    }
})
statusbars.onZero(StatusBarKind.WizHelth, function (status) {
    EvWiard.destroy(effects.spray, 500)
    game.splash("You defeated the Evil Wizard")
    game.splash("Enter blue portal now.")
    tiles.setTileAt(tiles.getTileLocation(18, 3), sprites.dungeon.collectibleInsignia)
    tiles.setTileAt(tiles.getTileLocation(18, 7), sprites.dungeon.chestClosed)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    if (Heroskin[0] == 1) {
        Keys.push("1")
        tiles.setTileAt(tiles.getTileLocation(24, 3), sprites.dungeon.chestOpen)
        game.splash("You have acquired a key. Find 4 to unlock the Boss level. ")
        game.splash("Enter blue portal now.")
        tiles.setWallAt(tiles.getTileLocation(3, 0), false)
        tiles.setWallAt(tiles.getTileLocation(3, 1), false)
        tiles.setWallAt(tiles.getTileLocation(3, 2), false)
        tiles.setWallAt(tiles.getTileLocation(3, 3), false)
    } else if (Heroskin[0] == 2) {
        Keys.push("2")
        tiles.setTileAt(tiles.getTileLocation(18, 7), sprites.dungeon.chestOpen)
        game.splash("You have acquired a key. Find 4 to unlock the Boss level. ")
        game.splash("Enter blue portal now.")
        effects.blizzard.endScreenEffect()
    } else if (Heroskin[0] == 3) {
        tiles.setTileAt(tiles.getTileLocation(159, 5), sprites.dungeon.chestOpen)
        game.showLongText("Looks like this chest is empty. ", DialogLayout.Bottom)
        game.splash("Enter blue portal now.")
    } else if (Heroskin[0] == 5) {
        Keys.push("4")
        tiles.setTileAt(tiles.getTileLocation(23, 8), sprites.dungeon.chestOpen)
        game.showLongText("You have acquired a key. Find 4 to unlock the Boss level. ", DialogLayout.Bottom)
        game.splash("Find blue portal now.")
    } else if (Heroskin[0] == 6) {
        tiles.setTileAt(tiles.getTileLocation(8, 10), sprites.dungeon.chestOpen)
        game.showLongText("Looks like this chest is empty. ", DialogLayout.Bottom)
        game.splash("Go to blue portal now.")
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`niniptL3`, function (sprite, location) {
    Heroskin = [3]
    game.splash("Loading Portal 3...")
    tiles.setCurrentTilemap(tilemap`level8`)
    Dif_Skin()
    game.showLongText("Uh oh, a shark is coming. If you get caught, -1 life!.", DialogLayout.Bottom)
    game.showLongText("Dodge rocks and get bubbles.", DialogLayout.Bottom)
    info.startCountdown(5)
})
function Game_over () {
    scene.setBackgroundImage(assets.image`Title Screen`)
    tiles.setCurrentTilemap(tilemap`Blank`)
    effects.confetti.startScreenEffect()
    game.splash("Credits:")
    game.splash("Ideas Collaborator", "Cody Conner")
    game.splash("Original Idea by", "Noah Guerrero")
    game.splash("Co-Programmers", "Noah and Cody")
    game.splash("Art by", "Noah and Cody")
    game.splash("Music by", "Noah Guerrero")
    game.splash("V 1.0 Finished Date", "2/13/22")
    game.splash("V 2.0 Finished Date", "3/2/22")
    game.splash("Thank You For Playing")
    game.splash("We will keep editing", " to make it better.")
    theme_song()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile21`, function (sprite, location) {
    game.showLongText("Finally, the Boss!!!", DialogLayout.Bottom)
    game.splash("Read the sign.")
    tiles.setCurrentTilemap(tilemap`level17`)
    scene.setBackgroundImage(assets.image`myImage`)
    tiles.placeOnRandomTile(hero, assets.tile`myTile`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.rock0, function (sprite, location) {
    hero.setVelocity(0, 0)
})
controller.combos.attachCombo("UUUDUBBBLL", function () {
    animation.runImageAnimation(
    hero,
    assets.animation`Sword Hit`,
    130,
    false
    )
    music.sonar.play()
    if (statusbar.value > 0) {
        statusbar.value += -20
        projectile = sprites.createProjectileFromSprite(assets.image`f1`, hero, -70, 0)
    }
    if (statusbar.value == 0) {
        timer.after(2000, function () {
            statusbar.value += 100
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow4, function (sprite, otherSprite) {
    Right.destroy()
    Left.destroy()
    chest.destroy()
    portal.destroy()
    pause2()
    Left = sprites.create(assets.image`3`, SpriteKind.Arrow2)
    Right = sprites.create(assets.image`1`, SpriteKind.Arrow3)
    Left.setPosition(20, 60)
    tiles.setCurrentTilemap(tilemap`area2`)
    Right.setPosition(240, 120)
    hero.setPosition(200, 120)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Shield, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.disintegrate, 1)
    Shield_Bar.value += -10
    if (Shield_Bar.value == 0) {
        Shield2.destroy(effects.disintegrate, 500)
        info.startCountdown(3)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.E3, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    animation.runImageAnimation(
    hero,
    assets.animation`explose`,
    100,
    false
    )
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy2)
    sprites.destroyAllSpritesOfKind(SpriteKind.E3)
    info.changeLifeBy(-1)
    statusbar.value += 100
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    tiles.placeOnRandomTile(hero, assets.tile`myTile11`)
    game.splash("You fell in the lava. -1 life.")
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Enemy2, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy2, effects.fire, 100)
    projectile.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.MegaBoss, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.spray, 1)
    ZBossHP.value += -10
})
function battle_song () {
    music.playMelody("F E D C F E D C ", 500)
    music.playMelody("F E D C F E D C ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("F - - - F - - - ", 500)
    music.playMelody("F - - - F - - - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("B - - - - G E C ", 500)
    music.playMelody("- - - - - - - - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("F - - - F - - - ", 500)
    music.playMelody("F - - - - - - - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("C - E - G - B - ", 500)
    music.playMelody("B - - - - G E C ", 500)
    music.playMelody("- - - - - - - - ", 500)
    music.playMelody("F E D C F E D C ", 500)
    music.playMelody("F E D C F E D C ", 500)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`niniptL4`, function (sprite, location) {
    Heroskin = [10]
    game.splash("Loading Portal 4...")
    Dif_Skin()
    tiles.setCurrentTilemap(tilemap`level13`)
    tiles.placeOnRandomTile(hero, assets.tile`myTile23`)
    game.splash("Search the chests for the key. ")
    game.splash("Some chests are bad though.")
})
function Intro () {
    scene.setBackgroundImage(assets.image`Park`)
    game.showLongText("It's a day like any other.", DialogLayout.Top)
    music.playMelody("C5 - - - - - - - ", 500)
    game.showLongText("You were taking a walk when suddenly...", DialogLayout.Top)
    scene.setBackgroundImage(assets.image`Portal`)
    music.playMelody("C B C B C B C B ", 500)
    game.showLongText("...", DialogLayout.Top)
    music.playMelody("C5 - - - - - - - ", 500)
    game.showLongText("A portal has opened!", DialogLayout.Top)
    scene.setBackgroundImage(assets.image`Portal Suck`)
    music.playMelody("C5 - - - - - - - ", 500)
    game.showLongText("It's sucking you into it. You try to resist but cant!", DialogLayout.Top)
    scene.setBackgroundImage(assets.image`Black`)
    music.playMelody("C - C - C - C - ", 120)
    game.splash("Who am I?")
    music.playMelody("C5 - - - - - - - ", 500)
    game.splash("What am I?")
    music.playMelody("C5 - - - - - - - ", 500)
    game.splash("Where am I?")
    music.playMelody("C5 - - - - - - - ", 500)
    game.splash("Why am I?")
    music.playMelody("- - - - - - - - ", 200)
    effects.confetti.startScreenEffect()
    scene.setBackgroundImage(assets.image`Title Screen`)
    theme_song()
    effects.confetti.endScreenEffect()
}
info.onLifeZero(function () {
    Reset()
    if (game.ask("A--Restart", "B--Checkpoint")) {
        if (game.ask("A--Skip Intro")) {
            beginning()
        } else {
            game.reset()
        }
    } else {
        game.splash("Loading Data...")
        if (Checkpoint_X_coordinate[0] == 0) {
            beginning()
        } else if (Checkpoint_X_coordinate[0] == 1) {
            Checkpoint1()
        } else if (Checkpoint_X_coordinate[0] == 2) {
            Checkpoint2()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    animation.runImageAnimation(
    hero,
    assets.animation`explose`,
    100,
    false
    )
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy2)
    sprites.destroyAllSpritesOfKind(SpriteKind.E3)
    info.changeLifeBy(-1)
    statusbar.value += 100
})
function Dif_Skin () {
    hero.destroy()
    if (Heroskin[0] == 1) {
        hero = sprites.create(assets.image`Jumpdude`, SpriteKind.Player)
        statusbar2 = statusbars.create(0, 0, StatusBarKind.Jumping)
        statusbar2.value = 100
        animation.runImageAnimation(
        hero,
        assets.animation`Jumperdude`,
        500,
        true
        )
        controller.moveSprite(hero, 100, 0)
        hero.ay = 150
        tiles.placeOnRandomTile(hero, assets.tile`myTile11`)
        scene.cameraFollowSprite(hero)
        hero.setStayInScreen(true)
    } else if (Heroskin[0] == 0) {
        hero = sprites.create(assets.image`Dude`, SpriteKind.Player)
        animation.runImageAnimation(
        hero,
        assets.animation`Walking`,
        200,
        true
        )
        scene.cameraFollowSprite(hero)
        statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
        statusbar.attachToSprite(hero)
        statusbar.setColor(7, 2, 4)
        statusbar.setLabel("PWR")
        statusbar.max = 100
        controller.moveSprite(hero, 100, 100)
    } else if (Heroskin[0] == 2) {
        hero = sprites.create(assets.image`Minidude`, SpriteKind.Player)
        tiles.placeOnRandomTile(hero, assets.tile`myTile17`)
        controller.moveSprite(hero, 100, 100)
        scene.cameraFollowSprite(hero)
        hero.setStayInScreen(true)
    } else if (Heroskin[0] == 3) {
        hero = sprites.create(assets.image`myImage1`, SpriteKind.Player)
        animation.runImageAnimation(
        hero,
        assets.animation`myAnim0`,
        200,
        true
        )
        controller.moveSprite(hero, 0, 100)
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
        ShkHp = statusbars.create(0, 0, StatusBarKind.skhlth)
        ShkHp.max = 10
        ShkHp.value = 10
        scene.cameraFollowSprite(hero)
    } else if (Heroskin[0] == 10) {
        hero = sprites.create(assets.image`Dude`, SpriteKind.Player)
        animation.runImageAnimation(
        hero,
        assets.animation`Walking`,
        200,
        true
        )
        scene.cameraFollowSprite(hero)
        statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
        statusbar.attachToSprite(hero)
        statusbar.setColor(7, 2, 4)
        statusbar.max = 100
        controller.moveSprite(hero, 100, 100)
        scaling.scaleByPercent(hero, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        scaling.scaleByPercent(statusbar, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    } else if (Heroskin[0] == 5) {
        hero = sprites.create(assets.image`Dude`, SpriteKind.Player)
        scene.cameraFollowSprite(hero)
        controller.moveSprite(hero, 100, 100)
    } else if (Heroskin[0] == 6) {
        hero = sprites.create(assets.image`Dude`, SpriteKind.Player)
        controller.moveSprite(hero, 100, 100)
        scene.cameraFollowSprite(hero)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.MegaBoss, function (sprite, otherSprite) {
    game.splash("I told you not to touch ", "the Boss. -1 life")
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(hero, assets.tile`myTile23`)
    sprites.destroyAllSpritesOfKind(SpriteKind.ZPro)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`niniptL2`, function (sprite, location) {
    Heroskin = [2]
    game.splash("Loading Portal 2...")
    Dif_Skin()
    Minigamewizard()
})
function beginning () {
    Checkpoint_X_coordinate = [0]
    info.setLife(3)
    tiles.setCurrentTilemap(tilemap`area1`)
    Right = sprites.create(assets.image`1`, SpriteKind.Arrow1)
    heart = sprites.create(assets.image`r`, SpriteKind.Food)
    heart.setPosition(25, 220)
    Right.setPosition(230, 60)
    game.splash("Meanwhile...")
    hero = sprites.create(assets.image`Dude`, SpriteKind.Player)
    scene.cameraFollowSprite(hero)
    hero.setPosition(80, -50)
    hero.setVelocity(0, 50)
    block = sprites.create(assets.image`dot`, SpriteKind.dot)
    block.setPosition(80, 120)
    music.smallCrash.play()
    animation.runImageAnimation(
    hero,
    assets.animation`Falling`,
    100,
    true
    )
}
sprites.onOverlap(SpriteKind.dot2, SpriteKind.Portal, function (sprite, otherSprite) {
    block.destroy()
    music.playMelody("C5 C5 C5 C5 C5 C5 C5 C5 ", 500)
    scene.cameraShake(3, 500)
    game.splash("Something's coming out!")
    Villian = sprites.create(assets.image`sdfgr`, SpriteKind.Boss)
    Villian.setPosition(240, 100)
    game.splash("A monster has appeared!!!")
    scene.cameraFollowSprite(hero)
    game.showLongText("Beware of enemies. If they touch you, you lose a life!", DialogLayout.Bottom)
    portal.destroy()
    controller.moveSprite(hero, 100, 100)
    Boss1_HP = statusbars.create(40, 4, StatusBarKind.Boss1Health)
    Boss1_HP.value = 300
    Boss1_HP.attachToSprite(Villian)
    E1 = sprites.create(assets.image`enemie`, SpriteKind.Enemy)
    E1.follow(hero)
    E1.setPosition(300, 120)
    E2 = sprites.create(assets.image`enemie`, SpriteKind.Enemy2)
    E2.follow(hero)
    E2.setPosition(300, 100)
    En3 = sprites.create(assets.image`enemie`, SpriteKind.E3)
    En3.follow(hero)
    En3.setPosition(300, 150)
    battle_song()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.jumpUp.play()
    heart.destroy()
    info.changeLifeBy(1)
    game.showLongText("You got 1 extra life!", DialogLayout.Bottom)
})
function Checkpoint2 () {
    Heroskin = [10]
    Dif_Skin()
    scene.setBackgroundImage(img`
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaafffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaafffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaafffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaafffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaffffffaaaaaaaaaaaaaffffffffaaffffffffaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaffffffaaaaaaaaaaaaafffffffaaaafffffffaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaaaffffffaaaaaaffffffaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaafffffffaaaaaafffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaaffffffaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaaffffffaaaaaaaaffffffaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaafffffffaaaaaaaafffffffaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaafffffaaaaaaaaaaafffffaaaaaaaaaaaafffffaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaafffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaafffffffffffaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaffffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaafffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaffffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaafffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaafffffffaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaffffffaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaffffffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaffffffffffaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaffffffffffffffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaffffffffffffffffffffffffaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaffffffffffffffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaffffffffffffffffffffffffaaaaaaaaaaaaffffffffffffffffffffaaaaaaaafffffffffffffffffffaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaaffffffffffffffffffffffaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaaffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaaaaaaffffffffffffffffffffffaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaafffffaaaaafffffffffffffffaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        `)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    tiles.setCurrentTilemap(tilemap`level7`)
    tiles.placeOnRandomTile(hero, assets.tile`myTile22`)
    info.setLife(3)
}
function Reset () {
    ZBossLevel = []
    Heroskin = []
    ZPosition = []
    scene.setBackgroundImage(assets.image`Blank`)
    tiles.setCurrentTilemap(tilemap`Blank`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy2)
    sprites.destroyAllSpritesOfKind(SpriteKind.E3)
    sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.EvilWizard)
    sprites.destroyAllSpritesOfKind(SpriteKind.WizProj)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shark)
    sprites.destroyAllSpritesOfKind(SpriteKind.MegaBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.ZPro)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile27`, function (sprite, location) {
    game.splash("Uh oh. -1 life life.")
    info.changeLifeBy(-1)
    tiles.setTileAt(tiles.getTileLocation(2, 12), sprites.dungeon.chestOpen)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`niniptL6`, function (sprite, location) {
    Heroskin = [6]
    game.splash("Loading Portal 6...")
    tiles.setCurrentTilemap(tilemap`level24`)
    Dif_Skin()
    tiles.placeOnRandomTile(hero, sprites.swamp.swampTile16)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`niniptL1`, function (sprite, location) {
    Heroskin = [1]
    game.splash("Loading Portal 1...")
    tiles.setCurrentTilemap(tilemap`mini1`)
    Dif_Skin()
    game.splash("Click A to jump. Don't fall in lava!")
    game.splash("Some platforms aren't stable enough and will make you fall!")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow1, function (sprite, otherSprite) {
    Right.destroy()
    pause2()
    Left = sprites.create(assets.image`3`, SpriteKind.Arrow2)
    chest = sprites.create(assets.image`z`, SpriteKind.chest1)
    heart.destroy()
    chest.setPosition(104, 87)
    Left.setPosition(20, 60)
    hero.setPosition(50, 60)
    tiles.setCurrentTilemap(tilemap`area2`)
    Right = sprites.create(assets.image`1`, SpriteKind.Arrow3)
    Right.setPosition(240, 120)
})
sprites.onOverlap(SpriteKind.E3, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.E3, effects.fire, 100)
    projectile.destroy()
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (Boss1_HP.value > 0) {
        timer.after(1000, function () {
            E1 = sprites.create(assets.image`enemie`, SpriteKind.Enemy)
            E1.setPosition(300, 120)
            E1.follow(hero)
        })
    }
})
statusbars.onZero(StatusBarKind.WizShield, function (status) {
    Shield2.destroy(effects.spray, 500)
})
function WizShieldsetup () {
    Shield2 = sprites.create(assets.image`sd`, SpriteKind.Shield)
    Shield_Bar = statusbars.create(20, 4, StatusBarKind.WizShield)
    Shield_Bar.attachToSprite(Shield2, 10, -20)
    Shield_Bar.setColor(9, 1)
    Shield_Bar.max = 100
    Shield_Bar.value = 100
    Shield_Bar.setLabel("Shield")
    Shield_Bar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    Shield2.follow(EvWiard, 500)
    tiles.placeOnRandomTile(Shield2, assets.tile`myTile16`)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`check1`, function (sprite, location) {
    Checkpoint_X_coordinate = [1]
    tiles.setTileAt(tiles.getTileLocation(12, 7), sprites.castle.tileDarkGrass1)
    game.splash("Saving...")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    Heroskin = [10]
    tiles.setCurrentTilemap(tilemap`level20`)
    Dif_Skin()
    controller.moveSprite(hero, 0, 0)
    tiles.placeOnRandomTile(hero, assets.tile`myTile23`)
    scene.cameraFollowSprite(hero)
    game.showLongText("The Boss is coming, don't get too close or a life will be taken!", DialogLayout.Bottom)
    block = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.dot)
    tiles.placeOnRandomTile(block, assets.tile`myTile34`)
    ZBoss = sprites.create(assets.image`bss`, SpriteKind.MegaBoss)
    animation.runImageAnimation(
    ZBoss,
    assets.animation`myAnim3`,
    200,
    true
    )
    tiles.placeOnRandomTile(ZBoss, sprites.castle.tilePath9)
    ZBoss.follow(block)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shield, function (sprite, otherSprite) {
    game.splash("Don't get too close")
    tiles.placeOnRandomTile(hero, assets.tile`myTile17`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`niniptL5`, function (sprite, location) {
    Heroskin = [5]
    game.splash("Loading Portal 5...")
    Dif_Skin()
    tiles.setCurrentTilemap(tilemap`level15`)
    tiles.placeOnRandomTile(hero, assets.tile`tile41`)
    game.splash("Find the Portal and chest!")
    game.splash("Watch your timer. You lose a life if it runs out.")
    game.splash("Get stopwatches to reset timer!")
    info.startCountdown(15)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    pause2()
    Dif_Skin()
    scene.setBackgroundImage(img`
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaafffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaafffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaafffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaafffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaffffffaaaaaaaaaaaaaffffffffaaffffffffaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaffffffaaaaaaaaaaaaafffffffaaaafffffffaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaaaffffffaaaaaaffffffaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaafffffffaaaaaafffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaaffffffaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaaffffffaaaaaaaaffffffaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaafffffffaaaaaaaafffffffaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaffffffaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaafffffaaaaaaaaaaafffffaaaaaaaaaaaafffffaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaafffffaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffaaaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaafffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaafffffffffffaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaffffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaafffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaffffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaafffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaaffffffaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaafffffaaaaaaafffffffaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaaffffffaaaaaaaaffffffaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaffffffffffaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffaaaaaaaaaaaaafffffaaaaaaaaaffffffffffaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaffffffffffffffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaffffffffffffffffffffffffaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaffffffffffffffffffffaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaffffffffffffffffffffffffaaaaaaaaaaaaffffffffffffffffffffaaaaaaaafffffffffffffffffffaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaafffffaaaaafffffffffffffffffffffffaaaaaaaaaaffffffffffffffffffffffaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaaffffffffffffffffffaaaaaaaafffffaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaaaaaaffffffffffffffffffffffaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaafffffaaaaafffffffffffffffaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        `)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    tiles.setCurrentTilemap(tilemap`level7`)
    tiles.placeOnRandomTile(hero, assets.tile`myTile22`)
    tiles.setTileAt(tiles.getTileLocation(8, 5), assets.tile`check2`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    Heroskin = [0]
    Dif_Skin()
    level2()
    Unlock()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile30`, function (sprite, location) {
    info.startCountdown(15)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    Keys.push("3")
    game.splash("You have acquired a key. Find 4 to unlock the Boss level. ")
    game.splash("Enter blue portal now.")
    tiles.setTileAt(tiles.getTileLocation(12, 2), sprites.dungeon.chestOpen)
    tiles.setTileAt(tiles.getTileLocation(14, 7), sprites.dungeon.collectibleInsignia)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile28`, function (sprite, location) {
    game.splash("Empty? Neither good nor bad.")
    tiles.setTileAt(tiles.getTileLocation(7, 12), sprites.dungeon.chestOpen)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`check2`, function (sprite, location) {
    Checkpoint_X_coordinate = [2]
    tiles.setTileAt(tiles.getTileLocation(8, 5), assets.tile`transparency16`)
    game.splash("Saving...")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    animation.runImageAnimation(
    hero,
    assets.animation`explose`,
    100,
    false
    )
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy2)
    sprites.destroyAllSpritesOfKind(SpriteKind.E3)
    info.changeLifeBy(-1)
    statusbar.value += 100
})
let ZBossPro: Sprite = null
let Wizprojectile: Sprite = null
let E1: Sprite = null
let heart: Sprite = null
let Checkpoint_X_coordinate: number[] = []
let Shield2: Sprite = null
let Shield_Bar: StatusBarSprite = null
let picture: Sprite = null
let ZBoss: Sprite = null
let E2: Sprite = null
let ShkHp: StatusBarSprite = null
let En3: Sprite = null
let Boss1_HP: StatusBarSprite = null
let Keys: string[] = []
let Villian: Sprite = null
let ZBossHP: StatusBarSprite = null
let ZPosition: number[] = []
let ZBossLevel: number[] = []
let Hero2Projectile: Sprite = null
let WizHelth: StatusBarSprite = null
let EvWiard: Sprite = null
let Shk: Sprite = null
let statusbar2: StatusBarSprite = null
let Heroskin: number[] = []
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let block: Sprite = null
let portal: Sprite = null
let Left: Sprite = null
let Right: Sprite = null
let hero: Sprite = null
let chest: Sprite = null
game.splash("Dedicated to our ", "Beloved Mr. Gulke")
game.splash("Game is Difficult", "Use Headphones")
game.splash("Start")
Intro()
beginning()
game.onUpdateInterval(1000, function () {
    if (ZBossLevel[0] == 2) {
        ZPosition = [randint(1, 2)]
    } else if (ZBossLevel[0] == 3) {
        ZPosition = [randint(1, 3)]
    }
})
game.onUpdateInterval(500, function () {
    if (Heroskin[0] == 2) {
        if (WizHelth.value > 0) {
            Wizprojectile = sprites.create(assets.image`blls`, SpriteKind.WizProj)
            Wizprojectile.setVelocity(-100, 0)
            Wizprojectile.setPosition(320, randint(5, 155))
            Wizprojectile.setStayInScreen(false)
        } else {
            Shield2.destroy()
            sprites.destroyAllSpritesOfKind(SpriteKind.WizProj)
        }
    } else if (Heroskin[0] == 3) {
        if (ShkHp.value > 0) {
            hero.setVelocity(80, 0)
        }
    } else if (Heroskin[0] == 10) {
        if (ZPosition[0] == 1) {
            ZBossPro = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . c a a . . . . . . . 
                . . . . . c c . c a . . . . . . 
                . . c f f c . . . a . . . . . . 
                . c c a f f . . . c a . . . . . 
                . c a a a c f f . c a . . . . . 
                . c a a a c c c c c a f f f . . 
                . c a a a a a a a c a a a a . . 
                . c a a a c c c c c a f f f . . 
                . c a a a c f f . c a . . . . . 
                . c c a f f . . . c a . . . . . 
                . . c f f c . . . a . . . . . . 
                . . . . . c c . c a . . . . . . 
                . . . . . . c a a . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.ZPro)
            ZBossPro.setPosition(320, randint(5, 400))
            ZBossPro.setStayInScreen(false)
            if (ZBossLevel[0] == 3) {
                ZBossPro.setVelocity(-150, 0)
            } else if (ZBossLevel[0] == 2) {
                ZBossPro.setVelocity(-100, 0)
            } else {
                ZBossPro.setVelocity(-75, 0)
            }
        } else if (ZPosition[0] == 2) {
            controller.moveSprite(hero)
            ZBossPro = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . f a f . . . . . . 
                . . . . . . . f a f . . . . . . 
                . . . . . . . f a f . . . . . . 
                . . . . . a a a a a a a . . . . 
                . . . a a c c c c c c c a a . . 
                . . a c . . . c a c . . . c a . 
                . . a . . . f c a c f . . . a . 
                . . c c . . f c a c f . . c c . 
                . . . c c f c c a c c f c c . . 
                . . . . f f a a a a a f f . . . 
                . . . . f a a a a a a a f . . . 
                . . . . c c a a a a a c c . . . 
                . . . . . c c c c c c c . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.ZPro)
            ZBossPro.setPosition(randint(5, 200), -10)
            ZBossPro.setStayInScreen(false)
            if (ZBossLevel[0] == 3) {
                ZBossPro.setVelocity(0, 150)
            } else {
                ZBossPro.setVelocity(0, 100)
            }
        } else if (ZPosition[0] == 3) {
            controller.moveSprite(hero)
            ZBossPro = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . a a c . . . . . . 
                . . . . . . a c . c c . . . . . 
                . . . . . . a . . . c f f c . . 
                . . . . . a c . . . f f a c c . 
                . . . . . a c . f f c a a a c . 
                . . f f f a c c c c c a a a c . 
                . . a a a a c a a a a a a a c . 
                . . f f f a c c c c c a a a c . 
                . . . . . a c . f f c a a a c . 
                . . . . . a c . . . f f a c c . 
                . . . . . . a . . . c f f c . . 
                . . . . . . a c . c c . . . . . 
                . . . . . . . a a c . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.ZPro)
            ZBossPro.setPosition(-100, randint(5, 400))
            ZBossPro.setStayInScreen(false)
            if (ZBossLevel[0] == 3) {
                ZBossPro.setVelocity(150, 0)
            } else {
                ZBossPro.setVelocity(100, 0)
            }
        }
    }
})
game.onUpdateInterval(10000, function () {
    if (ZBossLevel[0] == 2) {
        sprites.destroyAllSpritesOfKind(SpriteKind.ZPro)
    } else if (ZBossLevel[0] == 3) {
        sprites.destroyAllSpritesOfKind(SpriteKind.ZPro)
    }
})
