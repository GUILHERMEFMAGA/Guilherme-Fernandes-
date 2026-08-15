$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

. (Join-Path $PSScriptRoot 'Assistente.Core.ps1')

Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

[xml]$xaml = @'
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Name="MainWindow"
        Title="Assistente Guilherme"
        Width="900"
        Height="720"
        MinWidth="760"
        MinHeight="620"
        WindowStartupLocation="CenterScreen"
        Background="#08111F"
        Foreground="#F8FAFC"
        FontFamily="Segoe UI">
    <Window.Resources>
        <Style x:Key="PrimaryButton" TargetType="Button">
            <Setter Property="Background" Value="#7C3AED" />
            <Setter Property="Foreground" Value="White" />
            <Setter Property="BorderBrush" Value="#8B5CF6" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="FontWeight" Value="SemiBold" />
            <Setter Property="FontSize" Value="14" />
            <Setter Property="Padding" Value="18,11" />
            <Setter Property="Cursor" Value="Hand" />
        </Style>
        <Style x:Key="SecondaryButton" TargetType="Button">
            <Setter Property="Background" Value="#172033" />
            <Setter Property="Foreground" Value="#E2E8F0" />
            <Setter Property="BorderBrush" Value="#334155" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="FontWeight" Value="SemiBold" />
            <Setter Property="FontSize" Value="13" />
            <Setter Property="Padding" Value="14,9" />
            <Setter Property="Margin" Value="0,0,9,9" />
            <Setter Property="Cursor" Value="Hand" />
        </Style>
        <Style TargetType="TextBox">
            <Setter Property="Background" Value="#0F1A2C" />
            <Setter Property="Foreground" Value="#F8FAFC" />
            <Setter Property="BorderBrush" Value="#334155" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="CaretBrush" Value="#A78BFA" />
            <Setter Property="FontSize" Value="15" />
        </Style>
    </Window.Resources>

    <Grid Margin="28">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="Auto" />
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>

        <Grid Grid.Row="0" Margin="0,0,0,20">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="*" />
                <ColumnDefinition Width="Auto" />
            </Grid.ColumnDefinitions>

            <StackPanel Grid.Column="0">
                <TextBlock Text="ASSISTENTE GUILHERME"
                           Foreground="#A78BFA"
                           FontSize="12"
                           FontWeight="Bold" />
                <TextBlock Text="O que vamos abrir hoje?"
                           FontSize="30"
                           FontWeight="Bold"
                           Margin="0,5,0,4" />
                <TextBlock Text="Use sua voz ou digite um comando. Você sempre continua no controle."
                           Foreground="#94A3B8"
                           FontSize="14" />
            </StackPanel>

            <Border Grid.Column="1"
                    Background="#0F1A2C"
                    BorderBrush="#26364D"
                    BorderThickness="1"
                    CornerRadius="14"
                    Padding="16,12"
                    VerticalAlignment="Center">
                <StackPanel Orientation="Horizontal">
                    <Ellipse x:Name="StatusDot"
                             Width="10"
                             Height="10"
                             Fill="#64748B"
                             Margin="0,0,9,0"
                             VerticalAlignment="Center" />
                    <TextBlock x:Name="VoiceStatusText"
                               Text="Preparando a voz..."
                               Foreground="#CBD5E1"
                               VerticalAlignment="Center"
                               FontSize="13" />
                </StackPanel>
            </Border>
        </Grid>

        <Border Grid.Row="1"
                Background="#0D1728"
                BorderBrush="#26364D"
                BorderThickness="1"
                CornerRadius="18"
                Padding="20"
                Margin="0,0,0,16">
            <StackPanel>
                <TextBlock Text="Comando"
                           FontWeight="SemiBold"
                           FontSize="14"
                           Margin="0,0,0,9" />
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*" />
                        <ColumnDefinition Width="Auto" />
                        <ColumnDefinition Width="Auto" />
                    </Grid.ColumnDefinitions>

                    <TextBox x:Name="CommandInput"
                             Grid.Column="0"
                             Height="46"
                             Padding="13,11"
                             VerticalContentAlignment="Center"
                             ToolTip="Exemplo: abra o YouTube" />
                    <Button x:Name="SendButton"
                            Grid.Column="1"
                            Content="Executar"
                            Style="{StaticResource PrimaryButton}"
                            Margin="10,0,0,0"
                            MinWidth="105" />
                    <Button x:Name="ListenButton"
                            Grid.Column="2"
                            Content="🎙  Ouvir"
                            Style="{StaticResource SecondaryButton}"
                            Margin="10,0,0,0"
                            MinWidth="105" />
                </Grid>

                <Grid Margin="0,13,0,0">
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*" />
                        <ColumnDefinition Width="Auto" />
                    </Grid.ColumnDefinitions>
                    <TextBlock Grid.Column="0"
                               Text="Exemplo: “pesquise no YouTube por música brasileira”"
                               Foreground="#64748B"
                               FontSize="12"
                               VerticalAlignment="Center" />
                    <CheckBox x:Name="SpeakRepliesCheckBox"
                              Grid.Column="1"
                              Content="Ler respostas em voz alta"
                              IsChecked="False"
                              Foreground="#94A3B8"
                              FontSize="12"
                              VerticalAlignment="Center" />
                </Grid>
            </StackPanel>
        </Border>

        <Border Grid.Row="2"
                Background="#0D1728"
                BorderBrush="#26364D"
                BorderThickness="1"
                CornerRadius="18"
                Padding="20,17,20,9"
                Margin="0,0,0,16">
            <StackPanel>
                <TextBlock Text="Atalhos seguros"
                           FontWeight="SemiBold"
                           FontSize="14"
                           Margin="0,0,0,12" />
                <WrapPanel>
                    <Button x:Name="YouTubeButton" Content="▶  YouTube" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="GoogleButton" Content="⌕  Google" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="GmailButton" Content="✉  Gmail" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="MapsButton" Content="⌖  Maps" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="WhatsAppButton" Content="●  WhatsApp" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="CalculatorButton" Content="＋  Calculadora" Style="{StaticResource SecondaryButton}" />
                </WrapPanel>
            </StackPanel>
        </Border>

        <Border Grid.Row="3"
                Background="#0D1728"
                BorderBrush="#26364D"
                BorderThickness="1"
                CornerRadius="18"
                Padding="20">
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto" />
                    <RowDefinition Height="*" />
                </Grid.RowDefinitions>
                <Grid Grid.Row="0" Margin="0,0,0,11">
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*" />
                        <ColumnDefinition Width="Auto" />
                    </Grid.ColumnDefinitions>
                    <TextBlock Grid.Column="0"
                               Text="Atividade"
                               FontWeight="SemiBold"
                               FontSize="14" />
                    <Button x:Name="ClearHistoryButton"
                            Grid.Column="1"
                            Content="Limpar"
                            Background="Transparent"
                            Foreground="#94A3B8"
                            BorderThickness="0"
                            Cursor="Hand" />
                </Grid>
                <TextBox x:Name="HistoryTextBox"
                         Grid.Row="1"
                         IsReadOnly="True"
                         AcceptsReturn="True"
                         TextWrapping="Wrap"
                         VerticalScrollBarVisibility="Auto"
                         Padding="13"
                         FontSize="13"
                         Foreground="#CBD5E1" />
            </Grid>
        </Border>

        <TextBlock Grid.Row="4"
                   Text="Privacidade: o áudio é processado pelo mecanismo de reconhecimento instalado no Windows e não é salvo por este aplicativo."
                   Foreground="#64748B"
                   FontSize="11"
                   TextAlignment="Center"
                   Margin="0,14,0,0" />
    </Grid>
</Window>
'@

$xmlReader = New-Object System.Xml.XmlNodeReader $xaml
try {
    $script:window = [Windows.Markup.XamlReader]::Load($xmlReader)
}
finally {
    $xmlReader.Close()
}

function Get-NamedControl {
    param([Parameter(Mandatory = $true)][string]$Name)
    return $script:window.FindName($Name)
}

$script:statusDot = Get-NamedControl -Name 'StatusDot'
$script:voiceStatusText = Get-NamedControl -Name 'VoiceStatusText'
$script:commandInput = Get-NamedControl -Name 'CommandInput'
$script:sendButton = Get-NamedControl -Name 'SendButton'
$script:listenButton = Get-NamedControl -Name 'ListenButton'
$script:speakRepliesCheckBox = Get-NamedControl -Name 'SpeakRepliesCheckBox'
$script:historyTextBox = Get-NamedControl -Name 'HistoryTextBox'
$script:clearHistoryButton = Get-NamedControl -Name 'ClearHistoryButton'
$script:youtubeButton = Get-NamedControl -Name 'YouTubeButton'
$script:googleButton = Get-NamedControl -Name 'GoogleButton'
$script:gmailButton = Get-NamedControl -Name 'GmailButton'
$script:mapsButton = Get-NamedControl -Name 'MapsButton'
$script:whatsAppButton = Get-NamedControl -Name 'WhatsAppButton'
$script:calculatorButton = Get-NamedControl -Name 'CalculatorButton'

$script:recognizer = $null
$script:synthesizer = $null
$script:speechHandler = $null
$script:isListening = $false
$script:brushConverter = New-Object System.Windows.Media.BrushConverter

function Set-VoiceStatus {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][string]$Color
    )

    $script:voiceStatusText.Text = $Text
    $script:statusDot.Fill = $script:brushConverter.ConvertFromString($Color)
}

function Add-HistoryEntry {
    param(
        [Parameter(Mandatory = $true)][string]$Speaker,
        [Parameter(Mandatory = $true)][string]$Text
    )

    $timestamp = Get-Date -Format 'HH:mm'
    $script:historyTextBox.AppendText("[$timestamp] ${Speaker}: $Text`r`n")
    $script:historyTextBox.ScrollToEnd()
}

function Speak-AssistantMessage {
    param([AllowEmptyString()][string]$Message)

    if (
        $null -ne $script:synthesizer -and
        $script:speakRepliesCheckBox.IsChecked -eq $true -and
        -not [string]::IsNullOrWhiteSpace($Message)
    ) {
        try {
            $script:synthesizer.SpeakAsyncCancelAll()
            [void]$script:synthesizer.SpeakAsync($Message)
        }
        catch {
            Add-HistoryEntry -Speaker 'Sistema' -Text 'Não foi possível reproduzir a resposta em voz alta.'
        }
    }
}

function Stop-VoiceRecognition {
    if ($null -eq $script:recognizer -or -not $script:isListening) {
        return
    }

    try {
        $script:recognizer.RecognizeAsyncCancel()
    }
    catch {
        # O reconhecedor pode já estar encerrando. Nesse caso, basta atualizar a interface.
    }

    $script:isListening = $false
    $script:listenButton.Content = '🎙  Ouvir'
    Set-VoiceStatus -Text 'Voz pronta. Clique em Ouvir.' -Color '#22C55E'
}

function Start-VoiceRecognition {
    if ($null -eq $script:recognizer) {
        Add-HistoryEntry -Speaker 'Sistema' -Text 'O reconhecimento de voz não está disponível. Confira o pacote de fala do Windows.'
        return
    }

    if ($script:isListening) {
        return
    }

    try {
        $script:recognizer.RecognizeAsync([System.Speech.Recognition.RecognizeMode]::Multiple)
        $script:isListening = $true
        $script:listenButton.Content = '■  Parar'
        Set-VoiceStatus -Text 'Ouvindo... diga um comando.' -Color '#A78BFA'
        Add-HistoryEntry -Speaker 'Sistema' -Text 'Microfone ativado. Diga, por exemplo: “abra o YouTube”.'
    }
    catch {
        Set-VoiceStatus -Text 'Não foi possível acessar o microfone.' -Color '#EF4444'
        Add-HistoryEntry -Speaker 'Sistema' -Text "Falha ao iniciar o microfone: $($_.Exception.Message)"
    }
}

function Invoke-ResolvedCommand {
    param([Parameter(Mandatory = $true)]$Result)

    Add-HistoryEntry -Speaker 'Assistente' -Text $Result.Message
    Speak-AssistantMessage -Message $Result.Message

    try {
        switch ($Result.Action) {
            'OpenUrl' {
                Start-Process $Result.Target
                break
            }
            'SearchYouTube' {
                $encodedQuery = [System.Uri]::EscapeDataString($Result.Parameter)
                Start-Process "https://www.youtube.com/results?search_query=$encodedQuery"
                break
            }
            'SearchWeb' {
                $encodedQuery = [System.Uri]::EscapeDataString($Result.Parameter)
                Start-Process "https://www.google.com/search?q=$encodedQuery"
                break
            }
            'OpenApplication' {
                Start-Process $Result.Target
                break
            }
            'StopListening' {
                Stop-VoiceRecognition
                break
            }
            default {
                # Help e Unknown só precisam mostrar a resposta.
                break
            }
        }
    }
    catch {
        Add-HistoryEntry -Speaker 'Sistema' -Text "Não consegui executar a ação: $($_.Exception.Message)"
    }
}

function Submit-AssistantCommand {
    param([AllowEmptyString()][string]$Command)

    if ([string]::IsNullOrWhiteSpace($Command)) {
        return
    }

    Add-HistoryEntry -Speaker 'Você' -Text $Command.Trim()
    $result = Resolve-AssistantCommand -Command $Command
    Invoke-ResolvedCommand -Result $result
}

function Handle-RecognizedSpeech {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][double]$Confidence
    )

    $percentage = [Math]::Round($Confidence * 100)
    $script:commandInput.Text = $Text
    Add-HistoryEntry -Speaker "Você · voz $percentage%" -Text $Text
    $result = Resolve-AssistantCommand -Command $Text
    Invoke-ResolvedCommand -Result $result
}

function Initialize-SpeechServices {
    try {
        Add-Type -AssemblyName System.Speech

        $installedRecognizers = @(
            [System.Speech.Recognition.SpeechRecognitionEngine]::InstalledRecognizers()
        )
        if ($installedRecognizers.Count -eq 0) {
            throw 'Nenhum pacote de reconhecimento de fala está instalado.'
        }

        $selectedRecognizer = $installedRecognizers |
            Where-Object { $_.Culture.Name -eq 'pt-BR' } |
            Select-Object -First 1
        if ($null -eq $selectedRecognizer) {
            $selectedRecognizer = $installedRecognizers |
                Where-Object { $_.Culture.TwoLetterISOLanguageName -eq 'pt' } |
                Select-Object -First 1
        }
        if ($null -eq $selectedRecognizer) {
            $selectedRecognizer = $installedRecognizers | Select-Object -First 1
        }

        $script:recognizer = [System.Speech.Recognition.SpeechRecognitionEngine]::new(
            $selectedRecognizer.Culture
        )
        $dictationGrammar = [System.Speech.Recognition.DictationGrammar]::new()
        $dictationGrammar.Name = 'Comandos do Assistente Guilherme'
        $script:recognizer.LoadGrammar($dictationGrammar)
        $script:recognizer.SetInputToDefaultAudioDevice()

        $script:speechHandler = [System.EventHandler[System.Speech.Recognition.SpeechRecognizedEventArgs]] {
            param($sender, $eventArgs)

            if ($eventArgs.Result.Confidence -lt 0.45) {
                return
            }

            $recognizedText = $eventArgs.Result.Text
            $recognizedConfidence = [double]$eventArgs.Result.Confidence
            $uiCallback = [System.Action]({
                Handle-RecognizedSpeech -Text $recognizedText -Confidence $recognizedConfidence
            }.GetNewClosure())
            [void]$script:window.Dispatcher.Invoke($uiCallback)
        }
        $script:recognizer.add_SpeechRecognized($script:speechHandler)

        $script:synthesizer = [System.Speech.Synthesis.SpeechSynthesizer]::new()
        $portugueseVoice = $script:synthesizer.GetInstalledVoices() |
            Where-Object {
                $_.Enabled -and
                $_.VoiceInfo.Culture.TwoLetterISOLanguageName -eq 'pt'
            } |
            Select-Object -First 1
        if ($null -ne $portugueseVoice) {
            $script:synthesizer.SelectVoice($portugueseVoice.VoiceInfo.Name)
        }

        Set-VoiceStatus `
            -Text "Voz pronta ($($selectedRecognizer.Culture.Name)). Clique em Ouvir." `
            -Color '#22C55E'
    }
    catch {
        $script:recognizer = $null
        $script:listenButton.IsEnabled = $false
        Set-VoiceStatus -Text 'Voz indisponível; use o campo de texto.' -Color '#F59E0B'
        Add-HistoryEntry -Speaker 'Sistema' -Text "Voz indisponível: $($_.Exception.Message)"
    }
}

$script:sendButton.Add_Click({
    Submit-AssistantCommand -Command $script:commandInput.Text
})

$script:commandInput.Add_KeyDown({
    param($sender, $eventArgs)
    if ($eventArgs.Key -eq [System.Windows.Input.Key]::Enter) {
        $eventArgs.Handled = $true
        Submit-AssistantCommand -Command $script:commandInput.Text
    }
})

$script:listenButton.Add_Click({
    if ($script:isListening) {
        Stop-VoiceRecognition
    }
    else {
        Start-VoiceRecognition
    }
})

$script:clearHistoryButton.Add_Click({
    $script:historyTextBox.Clear()
})

$script:youtubeButton.Add_Click({ Submit-AssistantCommand -Command 'abra o YouTube' })
$script:googleButton.Add_Click({ Submit-AssistantCommand -Command 'abra o Google' })
$script:gmailButton.Add_Click({ Submit-AssistantCommand -Command 'abra o Gmail' })
$script:mapsButton.Add_Click({ Submit-AssistantCommand -Command 'abra o Maps' })
$script:whatsAppButton.Add_Click({ Submit-AssistantCommand -Command 'abra o WhatsApp' })
$script:calculatorButton.Add_Click({ Submit-AssistantCommand -Command 'abra a calculadora' })

$script:window.Add_ContentRendered({
    [void]$script:commandInput.Focus()
})

$script:window.Add_Closing({
    if ($null -ne $script:recognizer) {
        try {
            if ($script:isListening) {
                $script:recognizer.RecognizeAsyncCancel()
            }
            if ($null -ne $script:speechHandler) {
                $script:recognizer.remove_SpeechRecognized($script:speechHandler)
            }
            $script:recognizer.UnloadAllGrammars()
            $script:recognizer.Dispose()
        }
        catch {
            # A janela já está fechando; não há ação adicional necessária.
        }
    }

    if ($null -ne $script:synthesizer) {
        try {
            $script:synthesizer.SpeakAsyncCancelAll()
            $script:synthesizer.Dispose()
        }
        catch {
            # A janela já está fechando; não há ação adicional necessária.
        }
    }
})

Add-HistoryEntry -Speaker 'Assistente' -Text 'Olá! Digite um comando ou clique em Ouvir para usar o microfone.'
Initialize-SpeechServices
[void]$script:window.ShowDialog()
